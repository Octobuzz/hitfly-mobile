import { createStackNavigator } from 'react-navigation-stack'
import {
  // screens
  NewPlaylistScreen,
  GenrePlaylistScreen,
  Top50PlaylistScreen,
  TopWeekPlaylistScreen,
  CollectionPlaylistScreen,
  ListenedNowPlaylistScreen,
} from 'src/containers'
import {
  HomeScreen,
  GenresDetailedScreen,
  MusicFanCollectionsDetailedScreen,
  RecommenedCollectionsDetailedScreen,
} from 'src/screens'
import { stackDefaultOptions, playlistConfig } from './configs'
import { routes } from 'src/constants'

const MainNavigator = createStackNavigator(
  {
    [routes.MAIN.HOME]: {
      screen: HomeScreen,
      navigationOptions: { headerTitle: 'Главное' },
    },
    [routes.MAIN.RECOMMENDED_DETAILS]: {
      screen: RecommenedCollectionsDetailedScreen,
      navigationOptions: {
        title: 'Рекомендуем',
      },
    },
    [routes.MAIN.MUSIC_FAN_DETAILS]: {
      screen: MusicFanCollectionsDetailedScreen,
      navigationOptions: {
        title: 'Супер меломан',
      },
    },
    [routes.MAIN.COLLECTION_PLAYLIST]: {
      screen: CollectionPlaylistScreen,
      navigationOptions: playlistConfig,
    },
    [routes.MAIN.TOP_50_PLAYLIST]: {
      screen: Top50PlaylistScreen,
      navigationOptions: playlistConfig,
    },
    [routes.MAIN.LISTENED_NOW_PLAYLIST]: {
      screen: ListenedNowPlaylistScreen,
      navigationOptions: playlistConfig,
    },
    [routes.MAIN.NEW_PLAYLIST]: {
      screen: NewPlaylistScreen,
      navigationOptions: playlistConfig,
    },
    [routes.MAIN.TOP_WEEK_PLAYLIST]: {
      screen: TopWeekPlaylistScreen,
      navigationOptions: playlistConfig,
    },
    [routes.MAIN.GENRE_PLAYLIST]: {
      screen: GenrePlaylistScreen,
      navigationOptions: playlistConfig,
    },
    [routes.MAIN.GENRES_DETAILED]: {
      screen: GenresDetailedScreen,
      navigationOptions: {
        title: 'Жанры',
      },
    },
  },
  {
    initialRouteName: routes.MAIN.HOME,
    headerMode: 'screen',
    defaultNavigationOptions: {
      ...stackDefaultOptions,
    },
  },
)

export default MainNavigator
