import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import {
  Player,
  LogoutModal,
  BottomPlayer,
  AuthErrorModal,
  DetailedTrackMenu,
  HeaderRightButtons,
  // screens
  NewPlaylistScreen,
  AlbumPlaylistScreen,
  GenrePlaylistScreen,
  Top50PlaylistScreen,
  TopWeekPlaylistScreen,
  MyMusicPlaylistScreen,
  LikedMusicPlaylistScreen,
  CollectionPlaylistScreen,
  ListenedNowPlaylistScreen,
} from 'src/containers'
import {
  LogoutModalRef,
  AuthErrorModalRef,
  DetailedTrackMenuRef,
} from 'src/globalRefs'
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
  LikedAlbumsDetailedScreen,
  SelectGenreForProfileScreen,
  MusicFanCollectionsDetailedScreen,
  RecommenedCollectionsDetailedScreen,
} from 'src/screens'
import PlayerNavigator from './Player'
import { stackDefaultOptions, playlistConfig } from './configs'
import { routes } from 'src/constants'
import { View } from 'src/components'

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
    // Экраны профиля
    [routes.MAIN.PROFILE]: {
      screen: ProfileTabScreen,
      navigationOptions: {
        headerTransparent: true,
        headerTintColor: 'white',
      },
    },
    [routes.MAIN.ALBUM_PLAYLIST]: {
      screen: AlbumPlaylistScreen,
      navigationOptions: playlistConfig,
    },
    [routes.MAIN.SETTINGS]: {
      screen: SettingsScreen,
      navigationOptions: {
        title: 'Настройки',
      },
    },
    [routes.MAIN.REMOVE_ACCOUNT]: {
      screen: RemoveAccountScreen,
      navigationOptions: {
        title: 'Удаление аккаунта',
      },
    },
    [routes.MAIN.MY_GENRES]: {
      screen: MyGenresScreen,
      navigationOptions: { title: 'Любимые жанры' },
    },
    [routes.MAIN.SELECT_GENRE]: {
      screen: SelectGenreForProfileScreen,
      navigationOptions: { title: 'Выбор жанра' },
    },
    [routes.MAIN.AUTH_SETTINGS]: {
      screen: AuthSettingsScreen,
      navigationOptions: { title: 'Настройка входа' },
    },
    [routes.MAIN.CHANGE_PASSWORD]: {
      screen: ChangePasswordScreen,
      navigationOptions: { title: 'Создание пароля' },
    },
    [routes.MAIN.SOCIAL_AUTH]: SocialAuthWebScreen,
    [routes.MAIN.MY_ALBUMS_DETAILED]: {
      screen: MyAlbumsDetailedScreen,
      navigationOptions: { title: 'Мои альбомы' },
    },
    [routes.MAIN.LIKED_ALBUMS_DETAILED]: {
      screen: LikedAlbumsDetailedScreen,
      navigationOptions: { title: 'Любимые альбомы' },
    },
    [routes.MAIN.MY_MUSIC_PLAYLIST]: {
      screen: MyMusicPlaylistScreen,
      navigationOptions: playlistConfig,
    },
    [routes.MAIN.LIKED_MUSIC_PLAYLIST]: {
      screen: LikedMusicPlaylistScreen,
      navigationOptions: playlistConfig,
    },
  },
  {
    initialRouteName: routes.MAIN.HOME,
    headerMode: 'screen',
    defaultNavigationOptions: {
      ...stackDefaultOptions,
      headerRight: <HeaderRightButtons />,
    },
  },
)

const Main: React.FC<any> = props => (
  <View noPadding addBottomSafePadding>
    <MainNavigator {...props} />
    <BottomPlayer />
    <DetailedTrackMenu ref={DetailedTrackMenuRef.ref} />
    <AuthErrorModal ref={AuthErrorModalRef.ref} />
    <LogoutModal ref={LogoutModalRef.ref} />
    <Player />
  </View>
)

// @ts-ignore
Main.router = MainNavigator.router

const MainStack = createStackNavigator(
  {
    Main,
    PlayerNavigator,
  },
  {
    initialRouteName: 'Main',
    headerMode: 'none',
    mode: 'modal',
  },
)

export default MainStack
