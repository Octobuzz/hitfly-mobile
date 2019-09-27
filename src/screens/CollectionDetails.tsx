import L from 'lodash'
import React from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { Query } from '@apollo/react-components'
import { DocumentNode } from 'graphql'
import { Collection, PaginationVariables, Pagination } from 'src/apollo'
import { H1, Loader, CollectionItem } from 'src/components'
import styled from 'src/styled-components'

const Scroll = styled(FlatList as new () => FlatList<Collection>).attrs(() => ({
  numColumns: 2,
  initialNumToRender: 8,
  columnWrapperStyle: {
    justifyContent: 'space-between',
    marginBottom: 8,
  },
}))`
  flex: 1;
  padding: 24px 16px;
  margin-bottom: ${getBottomSpace()}px;
`

const IndentedH1 = styled(H1)`
  margin-bottom: 16px;
`

const Header = <IndentedH1>Плейлисты</IndentedH1>

interface CollectionsData {
  collections?: Pagination<Collection>
}

interface Props extends NavigationStackScreenProps {
  query: DocumentNode
}

class CollectionDetails extends React.Component<Props> {
  private onPressItem: (collection: Collection) => void
  private limit = 10

  constructor(props: Props) {
    super(props)
    this.onPressItem = props.navigation.getParam('onPressItem', () => {})
  }

  private renderItem: ListRenderItem<Collection> = ({ item }) => {
    return <CollectionItem collection={item} onPress={this.onPressItem} />
  }

  private keyExtractor = (item: Collection): string => item.id.toString()

  private mergePages = (
    page1: CollectionsData,
    page2: CollectionsData,
  ): CollectionsData => {
    return {
      ...page1,
      collections: {
        ...page1.collections,
        // @ts-ignore пока так
        items: [...page1.collections.items, ...page2.collections.items],
      },
    } as CollectionsData
  }

  render() {
    const { query } = this.props
    return (
      <Query<CollectionsData, PaginationVariables>
        query={query}
        variables={{ page: 1, limit: this.limit }}
      >
        {({ loading, data, fetchMore }) => {
          const collections = L.get(data, 'collections.items')

          if (!loading && L.isEmpty(collections)) {
            return null
          }
          const hasMorePages: boolean = L.get(
            data,
            'collections.hasMorePages',
            false,
          )
          return (
            <Scroll
              data={collections}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderItem}
              ListHeaderComponent={Header}
              ListFooterComponent={loading ? Loader : null}
              onEndReached={() => {
                if (hasMorePages) {
                  // + 1, потому что для бэка 1 и 0 - одно и то же
                  // поэтому page должна быть больше 1
                  const page = Math.trunc(collections.length / this.limit) + 1
                  fetchMore({
                    variables: { page },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      if (fetchMoreResult) {
                        return this.mergePages(prev, fetchMoreResult)
                      }
                      return prev
                    },
                  })
                }
              }}
            />
          )
        }}
      </Query>
    )
  }
}

export default CollectionDetails
