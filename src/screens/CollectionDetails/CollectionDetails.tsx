import React, { useCallback } from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import { Collection } from 'src/apollo'
import { styles } from 'src/constants'
import {
  H1,
  CollectionItem,
  RefreshControl,
  ListFooterLoader,
} from 'src/components'
import styled from 'src/styled-components'

const Scroll = styled(FlatList as new () => FlatList<Collection>).attrs(() => ({
  numColumns: 2,
  initialNumToRender: 8,
  columnWrapperStyle: {
    justifyContent: 'space-between',
    marginBottom: styles.VIEW_HORIZONTAL_INDENTATION,
  },
}))`
  flex: 1;
  padding: 24px 16px;
`

const IndentedH1 = styled(H1)`
  margin-bottom: 16px;
`

const Header = <IndentedH1>Плейлисты</IndentedH1>

interface Props {
  isLoading: boolean
  isRefreshing: boolean
  collections: Collection[]
  onRefresh: () => void
  onEndReached: () => any
  onPressItem: (collection: Collection) => void
}

const CollectionDetails: React.FC<Props> = ({
  isLoading,
  onRefresh,
  collections,
  onPressItem,
  isRefreshing,
  onEndReached,
}) => {
  const renderItem: ListRenderItem<Collection> = useCallback(
    ({ item }) => {
      return <CollectionItem collection={item} onPress={onPressItem} />
    },
    [onPressItem],
  )

  return (
    <Scroll
      data={collections}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
      renderItem={renderItem}
      ListHeaderComponent={Header}
      ListFooterComponent={<ListFooterLoader isShown={isLoading} />}
      onEndReached={onEndReached}
    />
  )
}

export default CollectionDetails
