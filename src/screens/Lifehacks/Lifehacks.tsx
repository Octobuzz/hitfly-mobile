import React, { useCallback } from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import { Lifehack } from 'src/apollo'
import { styles } from 'src/constants'
import LifehackItem from './LifehackItem'
import {
  Loader,
  TextBase,
  RefreshControl,
  ListFooterLoader,
} from 'src/components'
import styled from 'src/styled-components'

const Divider = styled.View`
  height: ${styles.VIEW_HORIZONTAL_INDENTATION}px;
  width: ${styles.VIEW_HORIZONTAL_INDENTATION}px;
`

const Scroll = styled(FlatList as new () => FlatList<Lifehack>).attrs(() => ({
  initialNumToRender: 4,
  ItemSeparatorComponent: Divider,
  contentContainerStyle: {
    paddingHorizontal: styles.VIEW_HORIZONTAL_INDENTATION,
    paddingVertical: styles.VIEW_HORIZONTAL_INDENTATION,
  },
}))`
  flex: 1;
`

const ListEmptyText = styled(TextBase)`
  color: ${({ theme }) => theme.colors.textAlt};
  text-align: center;
  padding-vertical: 50px;
`

interface Props {
  lifehacks: Lifehack[]
  onRefresh: () => void
  onEndReached: () => void
  onPressItem?: (item: Lifehack) => void
  likeItem?: (item: Lifehack) => void
  shareItem?: (item: Lifehack) => void
  addToBookmarks?: (item: Lifehack) => void
  isLoading: boolean
  isRefreshing: boolean
  isFetchingMore: boolean
}

const Lifehacks: React.FC<Props> = ({
  lifehacks,
  isLoading,
  onRefresh,
  onEndReached,
  isRefreshing,
  isFetchingMore,
  likeItem,
  shareItem,
  addToBookmarks,
  onPressItem,
}) => {
  const renderItem: ListRenderItem<Lifehack> = useCallback(
    ({ item }) => (
      <LifehackItem
        onPressLike={likeItem}
        onPressShare={shareItem}
        onPressBookmark={addToBookmarks}
        onPress={onPressItem}
        lifehack={item}
      />
    ),
    [likeItem, shareItem, addToBookmarks],
  )

  return (
    <Scroll
      onEndReached={onEndReached}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
      ListEmptyComponent={
        isLoading ? (
          <Loader isFilled />
        ) : (
          <ListEmptyText>Пока здесь пусто</ListEmptyText>
        )
      }
      ListFooterComponent={<ListFooterLoader isShown={isFetchingMore} />}
      data={lifehacks}
      renderItem={renderItem}
    />
  )
}

export default Lifehacks
