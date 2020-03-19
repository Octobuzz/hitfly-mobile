// import L from 'lodash'
import LFP from 'lodash/fp'
import React, { useState, useMemo } from 'react'
import { Share } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import LifehacksScreen from './Lifehacks'
import { /* GET_LIFEHACKS, LifehacksData, */ Lifehack } from 'src/apollo'
// import { useQueryWithPagination } from 'src/hooks'
// import { names } from 'src/constants'
import FadeTabs, { TabValue } from './FadeTabs'
import { withAuthorizedCheck } from 'src/HOCs'
import firebase from 'react-native-firebase'

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
    if (!item.isBookmarked) {
      showMessage({
        message: `Лайфхак ${item.title} добавлен в закладки`,
        hideStatusBar: true,
      })
    }
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

  const shareItem = (item: Lifehack) => {
    const link = new firebase.links.DynamicLink(
      `https://digico.itech-test.ru/life-hacks#${item.id}`,
      'https://hitfly.page.link',
    ).android
      .setPackageName('com.zebrains.hitfly')
      .ios.setBundleId('team.zebrains.hitfly')
      .ios.setAppStoreId('1477498408')
      .social.setTitle('Лайфхаки')
      .social.setImageUrl(item.image[0].imageUrl)
      .social.setDescriptionText(item.title)

    firebase
      .links()
      .createDynamicLink(link)
      .then(url => {
        Share.share({
          message: `${item.title}`,
          url: `${url}`,
        })
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

export default withAuthorizedCheck({
  passProfile: true,
  logoutText: 'Войдите чтобы увидеть данные профиля',
})(LifehacksContainer)
