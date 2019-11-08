import React from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import { Loader, CollectionItem, ListFooterLoader } from 'src/components'
import { Collection } from 'src/apollo'
import SectionWrapper from './SectionWrapper'
import SectionHeader from './SectionHeader'
import styled from 'src/styled-components'

const ITEM_WIDTH = 214
const ITEM_HEIGHT = 160
const DIVIDER_SIZE = 8

const SizedCollectionItem = styled(CollectionItem).attrs(() => ({
  width: ITEM_WIDTH,
  height: ITEM_HEIGHT,
}))``

const Column = styled.View`
  padding-horizontal: ${DIVIDER_SIZE / 2}px;
`

const ScrollWrapper = styled.View`
  height: ${ITEM_HEIGHT}px;
`

const Scroll = styled(FlatList as new () => FlatList<Collection>).attrs(() => ({
  horizontal: true,
  initialNumToRender: 2,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    paddingHorizontal: 12,
  },
}))``

interface Props {
  title: string
  subtitle?: string
  isLoading?: boolean
  isFetchingMore?: boolean
  collections: Collection[]
  onPressCollection: (collection: Collection) => void
  onPressHeader: () => void
  onEndReached: () => void
}

class ColleactionSection extends React.Component<Props> {
  private renderCollection: ListRenderItem<Collection> = ({ item }) => {
    const { onPressCollection } = this.props
    return (
      <Column>
        <SizedCollectionItem onPress={onPressCollection} collection={item} />
      </Column>
    )
  }

  // TODO: сделать каррируемую функцию
  private getItemLayout = (
    _: any,
    index: number,
  ): { length: number; offset: number; index: number } => {
    const length = ITEM_WIDTH + DIVIDER_SIZE
    return {
      length,
      offset: length * index,
      index,
    }
  }

  render() {
    const {
      title,
      subtitle,
      isLoading,
      collections,
      onEndReached,
      onPressHeader,
      isFetchingMore,
    } = this.props

    if (!isLoading && !collections.length) {
      return null
    }

    return (
      <SectionWrapper>
        <SectionHeader
          onPress={onPressHeader}
          title={title}
          subtitle={subtitle}
        />
        <ScrollWrapper>
          {isLoading ? (
            <Loader isAbsolute />
          ) : (
            <Scroll
              ListFooterComponent={
                <ListFooterLoader isShown={isFetchingMore} />
              }
              onEndReachedThreshold={0.9}
              onEndReached={onEndReached}
              getItemLayout={this.getItemLayout}
              renderItem={this.renderCollection}
              data={collections}
            />
          )}
        </ScrollWrapper>
      </SectionWrapper>
    )
  }
}

export default ColleactionSection
