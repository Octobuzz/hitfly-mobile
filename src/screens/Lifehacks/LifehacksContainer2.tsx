// import L from 'lodash'
import LFP from 'lodash/fp'
import React, { useState } from 'react'
import { Share } from 'react-native'
import LifehacksScreen from './Lifehacks'
import { /* GET_LIFEHACKS, LifehacksData, */ Lifehack } from 'src/apollo'
// import { useQueryWithPagination } from 'src/hooks'
// import { names } from 'src/constants'
import styled from 'src/styled-components'
import { Button } from 'src/components'

// const hasMorePagesSelector = (data?: LifehacksData) =>
//   L.get(data, 'lifehack.hasMorePages')
// const itemsSelector = (data?: LifehacksData) =>
//   L.get(data, 'lifehack.items', [])

interface Props {}

const lifehackMocks = [
  {
    id: 1,
    title: 'title 1',
    image: [
      {
        sizeName: 'size_300x300',
        imageUrl:
          'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
      },
    ],
    isFavorite: false,
    favouritesCount: 0,
    isBookmarked: false,
  },
  {
    id: 2,
    title: 'title 2',
    image: [
      {
        sizeName: 'size_300x300',
        imageUrl:
          'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
      },
    ],
    isFavorite: false,
    favouritesCount: 0,
    isBookmarked: false,
  },
  {
    id: 3,
    title: 'title 3',
    image: [
      {
        sizeName: 'size_300x300',
        imageUrl:
          'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
      },
    ],
    isFavorite: false,
    favouritesCount: 0,
    isBookmarked: false,
  },
] as Lifehack[]

const TabsWrapper = styled.View`
  padding: 24px 16px 8px;
  flex-direction: row;
`

const Divider = styled.View`
  width: 16px;
`

const FadedButton = styled(Button)<{ isActive?: boolean }>`
  opacity: ${({ isActive }) => (isActive ? 1 : 0.6)};
  flex: 1;
`

const LifehacksContainer: React.FC<Props> = () => {
  // FIXME: тут все временно
  const [items, setItems] = useState(lifehackMocks)

  const bookmarkItem = (item: Lifehack): void => {
    const index = LFP.findIndex(({ id }) => id === item.id, items)
    const newItem = LFP.set('isBookmarked', !item.isBookmarked, item)
    const newItems = LFP.set(index, newItem, items)
    setItems(newItems)
  }

  const likeItem = (item: Lifehack): void => {
    const index = LFP.findIndex(({ id }) => id === item.id, items)
    const newItem = LFP.pipe(
      LFP.set('isFavorite', !item.isFavorite),
      LFP.set(
        'favouritesCount',
        item.isFavorite ? item.favouritesCount - 1 : item.favouritesCount + 1,
      ),
    )(item)
    const newItems = LFP.set(index, newItem, items)
    setItems(newItems)
  }

  const shareItem = (item: Lifehack) => {
    Share.share({
      message: 'message',
      title: 'title',
      url: item.image[0].imageUrl,
    })
  }

  const [mode, setMode] = useState<'all' | 'bookmarks'>('all')

  return (
    <React.Fragment key={mode}>
      <TabsWrapper>
        <FadedButton
          onPress={() => {
            setMode('all')
          }}
          title="Все"
          withoutMargin
          verticalPadding={10}
          type="outline"
          isActive={mode === 'all'}
        />
        <Divider />
        <FadedButton
          onPress={() => {
            setMode('bookmarks')
          }}
          title="Избранное"
          withoutMargin
          verticalPadding={10}
          type="outline"
          isActive={mode === 'bookmarks'}
        />
      </TabsWrapper>
      {mode === 'all' ? (
        <LifehacksScreen
          lifehacks={items}
          likeItem={likeItem}
          shareItem={shareItem}
          bookmarkItem={bookmarkItem}
          onRefresh={() => {}}
          onEndReached={() => {}}
          isFetchingMore={false}
          isLoading={false}
          isRefreshing={false}
        />
      ) : (
        <LifehacksScreen
          lifehacks={items}
          likeItem={likeItem}
          shareItem={shareItem}
          bookmarkItem={bookmarkItem}
          onRefresh={() => {}}
          onEndReached={() => {}}
          isFetchingMore={false}
          showBookmarked="tab"
          isLoading={false}
          isRefreshing={false}
        />
      )}
    </React.Fragment>
  )

  // const {
  //   items,
  //   refetch,
  //   onEndReached,
  //   networkStatus,
  // } = useQueryWithPagination<LifehacksData>(GET_LIFEHACKS, {
  //   itemsSelector,
  //   hasMorePagesSelector,
  //   limit: names.LIFEHACKS_LIMIT,
  //   fetchPolicy: 'cache-and-network',
  // })
  // return (
  //   <LifehacksScreen
  //     lifehacks={items}
  //     onRefresh={refetch}
  //     onEndReached={onEndReached}
  //     isFetchingMore={networkStatus === 3}
  //     isLoading={networkStatus === 1}
  //     isRefreshing={networkStatus === 4}
  //   />
  // )
}

export default LifehacksContainer
