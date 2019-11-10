import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import {
  HeaderRightButtons,
  // screens
  NewPlaylistScreen,
  AlbumPlaylistScreen,
  GenrePlaylistScreen,
  Top50PlaylistScreen,
  TopWeekPlaylistScreen,
  CollectionPlaylistScreen,
  ListenedNowPlaylistScreen,
} from 'src/containers'
import { DetailedTrackPanel } from 'src/components'
import { DetailedPanel } from 'src/globalRefs'
import {
  HomeScreen,
  SettingsScreen,
  MyGenresScreen,
  ProfileTabScreen,
  AuthSettingsScreen,
  SocialAuthWebScreen,
  RemoveAccountScreen,
  GenresDetailedScreen,
  ChangePasswordScreen,
  MyAlbumsDetailedScreen,
  CollectionDetailsScreen,
  LikedAlbumsDetailedScreen,
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
    [routeNames.MAIN.GENRES_DETAILED]: {
      screen: GenresDetailedScreen,
      navigationOptions: {
        title: 'Жанры',
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
    [routeNames.MAIN.CHANGE_PASSWORD]: {
      screen: ChangePasswordScreen,
      navigationOptions: { title: 'Создание пароля' },
    },
    [routeNames.MAIN.SOCIAL_AUTH]: SocialAuthWebScreen,
    [routeNames.MAIN.MY_ALBUMS_DETAILED]: {
      screen: MyAlbumsDetailedScreen,
      navigationOptions: { title: 'Мои альбомы' },
    },
    [routeNames.MAIN.LIKED_ALBUMS_DETAILED]: {
      screen: LikedAlbumsDetailedScreen,
      navigationOptions: { title: 'Любимые альбомы' },
    },
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

const Main: React.FC<any> = props => (
  <>
    <MainNavigator {...props} />
    <DetailedTrackPanel ref={DetailedPanel.setPanel} />
  </>
)

// @ts-ignore
Main.router = MainNavigator.router

export default Main
