import L from 'lodash'
import LFP from 'lodash/fp'
import React, { useState, useMemo } from 'react'
import Share from 'react-native-share'
import { showMessage } from 'react-native-flash-message'
import LifehacksScreen from './Lifehacks'
import {
  GET_LIFEHACKS,
  /* GET_LIFEHACKS, LifehacksData, */ Lifehack,
  LifehacksData,
} from 'src/apollo'
import { useQueryWithPagination, useLifehackActions } from 'src/hooks'
import { names } from 'src/constants'
import FadeTabs, { TabValue } from './FadeTabs'
import { withAuthorizedCheck } from 'src/HOCs'
import firebase from 'react-native-firebase'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { DocumentNode } from 'graphql'

const hasMorePagesSelector = (data?: LifehacksData) =>
  L.get(data, 'lifehack.hasMorePages')
const itemsSelector = (data?: LifehacksData) =>
  L.get(data, 'lifehack.items', [])

interface Props extends NavigationStackScreenProps {
  query: DocumentNode
  limit?: number
  transformer?: (data?: any) => Lifehack
}

type Mode = 'all' | 'bookmarks'

const LifehacksContainer: React.FC<Props> = ({
  query,
  navigation,
  transformer,
  ...rest
}) => {
  // FIXME: тут все временно

  const {
    items,
    refetch,
    onEndReached,
    networkStatus,
  } = useQueryWithPagination<LifehacksData>(GET_LIFEHACKS, {
    itemsSelector,
    hasMorePagesSelector,
    limit: names.LIFEHACKS_LIMIT,
    fetchPolicy: 'cache-and-network',
  })

  const [{}, setItems] = useState(items)

  const {
    useLifehackLikedActions,
    useLifehackFavoriteActions,
  } = useLifehackActions
  const { toggleLifehackToFavorites } = useLifehackFavoriteActions()
  const { toggleLifehackToLiked } = useLifehackLikedActions()

  const addToBookmarks = (item: Lifehack): void => {
    toggleLifehackToFavorites(item)
    const index = LFP.findIndex(({ id }) => id === item.id, items)
    const newItem = LFP.set('hasFavorite', !item.hasFavorite, item)
    const newItems = LFP.set(index, newItem, items)
    if (!item.hasFavorite) {
      showMessage({
        message: `Лайфхак ${item.title} добавлен в закладки`,
        hideStatusBar: true,
      })
    }
    setItems(newItems)
  }

  // TODO: мутация
  const likeItem = (item: Lifehack): void => {
    toggleLifehackToLiked(item)
    const index = LFP.findIndex(({ id }) => id === item.id, items)
    const newItem = LFP.pipe(
      LFP.set('hasLike', !item.hasLike),
      LFP.set(
        'favouritesCount',
        item.hasLike ? item.countLike - 1 : item.countLike + 1,
      ),
    )(item)
    const newItems = LFP.set(index, newItem, items)
    setItems(newItems)
  }

  const shareItem = async (item: Lifehack) => {
    const link = new firebase.links.DynamicLink(
      `${names.DOMAIN_URL}life-hacks#${item.id}`,
      'https://hitfly.page.link',
    ).android
      .setPackageName('com.zebrains.hitfly')
      .ios.setBundleId('team.zebrains.hitfly')
      .ios.setAppStoreId('1477498408')
      .social.setTitle('Лайфхаки')
      .social.setImageUrl(item.image[0].imageUrl)
      .social.setDescriptionText(item.title)
    const sharedMessage = `${item.title}
                          ${item.image[0].imageUrl}
                          `
    await firebase
      .links()
      .createShortDynamicLink(link, 'UNGUESSABLE')
      .then(shortUrl => {
        Share.open({
          title: 'Лайфхаки',
          message: sharedMessage,
          url: `${shortUrl}`,
          subject: 'приложение Hitfly',
        })
      })
  }

  const [mode, setMode] = useState<Mode>('all')
  const lifehacks = useMemo(() => {
    return mode === 'all'
      ? items
      : items.filter(({ hasFavorite }) => hasFavorite)
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
        isRefreshing={networkStatus === 4}
        isLoading={networkStatus === 1}
        isFetchingMore={networkStatus === 3}
        onRefresh={refetch}
        onEndReached={onEndReached}
        {...rest}
      />
    </FadeTabs>
  )
}

export default withAuthorizedCheck({
  passProfile: true,
  logoutText: 'Войдите чтобы увидеть данные профиля',
})(LifehacksContainer)
