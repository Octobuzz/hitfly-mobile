import L from 'lodash'
import React from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { Query } from '@apollo/react-components'
import { DocumentNode } from 'graphql'
import { Collection } from 'src/apollo'
import { H1, Loader, CollectionItem } from 'src/components'
import styled from 'src/styled-components'
import { CollectionsData } from './Home/graphql'

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

interface Props extends NavigationScreenProps {}

class CollectionDetails extends React.Component<Props> {
  private query?: DocumentNode
  private onPressItem: (collection: Collection) => void

  constructor(props: Props) {
    super(props)
    this.query = props.navigation.getParam('query')
    this.onPressItem = props.navigation.getParam('onPressItem', () => {})
  }

  private renderItem: ListRenderItem<Collection> = ({ item }) => {
    return <CollectionItem collection={item} onPress={this.onPressItem} />
  }

  private keyExtractor = (item: Collection): string => item.id.toString()

  render() {
    if (!this.query) {
      return null
    }

    return (
      <Query<CollectionsData> query={this.query}>
        {({ loading, data }) => {
          const collections = L.get(data, 'collections.items')
          if (!loading && !collections) {
            return null
          }
          return (
            <Scroll
              data={collections}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderItem}
              ListHeaderComponent={Header}
              ListFooterComponent={loading ? Loader : null}
            />
          )
        }}
      </Query>
    )
  }
}

export default CollectionDetails
