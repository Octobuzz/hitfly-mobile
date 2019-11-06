import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import {
  HeaderRightButtons,
  // screens
  SettingsScreen,
  NewPlaylistScreen,
  AlbumPlaylistScreen,
  GenrePlaylistScreen,
  RemoveAccountScreen,
  Top50PlaylistScreen,
  TopWeekPlaylistScreen,
  CollectionPlaylistScreen,
  ListenedNowPlaylistScreen,
} from 'src/containers'
import {
  HomeScreen,
  MyGenresScreen,
  ProfileTabScreen,
  AuthSettingsScreen,
  SocialAuthWebScreen,
  CollectionDetailsScreen,
  SelectGenreForProfileScreen,
} from 'src/screens'
import { stackDefaultOptions, playlistConfig } from './configs'
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
    [routeNames.MAIN.TOP_WEEK_PLAYLIST]: {
      screen: TopWeekPlaylistScreen,
      navigationOptions: {
        title: 'Открытие недели',
        ...playlistConfig,
      },
    },
    [routeNames.MAIN.GENRE_PLAYLIST]: {
      screen: GenrePlaylistScreen,
      navigationOptions: ({ navigation }) => {
        const title = navigation.getParam('title')
        return {
          title,
          ...playlistConfig,
        }
      },
    },
    // Экраны профиля
    [routeNames.MAIN.PROFILE]: {
      screen: ProfileTabScreen,
      navigationOptions: {
        headerTransparent: true,
        headerTintColor: 'white',
      },
    },
    [routeNames.MAIN.ALBUM_PLAYLIST]: {
      screen: AlbumPlaylistScreen,
      navigationOptions: ({ navigation }) => {
        const title = navigation.getParam('title')
        return {
          title,
          ...playlistConfig,
        }
      },
    },
    [routeNames.MAIN.SETTINGS]: {
      screen: SettingsScreen,
      navigationOptions: {
        title: 'Настройки',
      },
    },
    [routeNames.MAIN.REMOVE_ACCOUNT]: {
      screen: RemoveAccountScreen,
      navigationOptions: {
        title: 'Удаление аккаунта',
      },
    },
    [routeNames.MAIN.MY_GENRES]: {
      screen: MyGenresScreen,
      navigationOptions: { title: 'Любимые жанры' },
    },
    [routeNames.MAIN.SELECT_GENRE]: {
      screen: SelectGenreForProfileScreen,
      navigationOptions: { title: 'Выбор жанра' },
    },
    [routeNames.MAIN.AUTH_SETTINGS]: {
      screen: AuthSettingsScreen,
      navigationOptions: { title: 'Настройка входа' },
    },
    [routeNames.MAIN.SOCIAL_AUTH]: SocialAuthWebScreen,
  },
  {
    initialRouteName: routeNames.MAIN.HOME,
    headerMode: 'screen',
    defaultNavigationOptions: {
      ...stackDefaultOptions,
      headerRight: <HeaderRightButtons />,
    },
  },
)

export default MainNavigator
