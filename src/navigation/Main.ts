import { createStackNavigator } from 'react-navigation-stack'
import { HomeScreen, CollectionDetailsScreen } from 'src/screens'
import {
  NewPlaylistScreen,
  Top50PlaylistScreen,
  CollectionPlaylistScreen,
  ListenedNowPlaylistScreen,
} from 'src/containers'
import { stackConfig, playlistConfig } from './configs'
import routeNames from './routeNames'

const MainNavigator = createStackNavigator(
  {
    [routeNames.MAIN.HOME]: {
      screen: HomeScreen,
      navigationOptions: { headerTitle: 'Главное' },
    },
    [routeNames.MAIN.COLLECTION_DETAILS]: {
      screen: CollectionDetailsScreen,
      navigationOptions: ({ navigation }) => {
        const title = navigation.getParam('title')
        return {
          title,
        }
      },
    },
    [routeNames.MAIN.COLLECTION_PLAYLIST]: {
      screen: CollectionPlaylistScreen,
      navigationOptions: ({ navigation }) => {
        const title = navigation.getParam('title')
        return {
          title,
          ...playlistConfig,
        }
      },
    },
    [routeNames.MAIN.TOP_50_PLAYLIST]: {
      screen: Top50PlaylistScreen,
      navigationOptions: {
        title: 'Топ 50',
        ...playlistConfig,
      },
    },
    [routeNames.MAIN.LISTENED_NOW_PLAYLIST]: {
      screen: ListenedNowPlaylistScreen,
      navigationOptions: {
        title: 'Слушают сейчас',
        ...playlistConfig,
      },
    },
    [routeNames.MAIN.NEW_PLAYLIST]: {
      screen: NewPlaylistScreen,
      navigationOptions: {
        title: 'Новое',
        ...playlistConfig,
      },
    },
  },
  {
    initialRouteName: routeNames.MAIN.HOME,
    headerMode: 'screen',
    ...stackConfig,
  },
)

export default MainNavigator
