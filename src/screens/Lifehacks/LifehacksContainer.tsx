// import L from 'lodash'
import LFP from 'lodash/fp'
import React, { useState, useMemo } from 'react'
import { Share } from 'react-native'
import LifehacksScreen from './Lifehacks'
import { /* GET_LIFEHACKS, LifehacksData, */ Lifehack } from 'src/apollo'
// import { useQueryWithPagination } from 'src/hooks'
// import { names } from 'src/constants'
import FadeTabs, { TabValue } from './FadeTabs'

// const hasMorePagesSelector = (data?: LifehacksData) =>
//   L.get(data, 'lifehack.hasMorePages')
// const itemsSelector = (data?: LifehacksData) =>
//   L.get(data, 'lifehack.items', [])

interface Props {}

type Mode = 'all' | 'bookmarks'

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

const LifehacksContainer: React.FC<Props> = () => {
  // FIXME: тут все временно
  const [items, setItems] = useState(lifehackMocks)

  // TODO: мутация
  const addToBookmarks = (item: Lifehack): void => {
    const index = LFP.findIndex(({ id }) => id === item.id, items)
    const newItem = LFP.set('isBookmarked', !item.isBookmarked, item)
    const newItems = LFP.set(index, newItem, items)
    setItems(newItems)
  }

  // TODO: мутация
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

  // FIXME: заполнить и проверить
  const shareItem = (item: Lifehack) => {
    Share.share({
      message: `${item.title} ${item.image[0].imageUrl}`,
    })
  }

  const [mode, setMode] = useState<Mode>('all')

  const lifehacks = useMemo(() => {
    return mode === 'all'
      ? items
      : items.filter(({ isBookmarked }) => isBookmarked)
  }, [mode, items])

  const values: TabValue<Mode>[] = useMemo(
    () => [
      {
        title: 'Все',
        value: 'all',
      },
      {
        title: 'Избранное',
        value: 'bookmarks',
      },
    ],
    [],
  )

  return (
    <FadeTabs<Mode> onPressTab={setMode} values={values}>
      <LifehacksScreen
        lifehacks={lifehacks}
        likeItem={likeItem}
        shareItem={shareItem}
        addToBookmarks={addToBookmarks}
        onRefresh={() => {}}
        onEndReached={() => {}}
        isFetchingMore={false}
        isLoading={false}
        isRefreshing={false}
      />
    </FadeTabs>
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
