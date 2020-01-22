import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import {
  HeaderRightWithSettings,
  // screens
  AlbumPlaylistScreen,
  MyMusicPlaylistScreen,
  LikedMusicPlaylistScreen,
} from 'src/containers'
import {
  SettingsScreen,
  MyGenresScreen,
  ProfileTabScreen,
  AuthSettingsScreen,
  SocialAuthWebScreen,
  RemoveAccountScreen,
  ChangePasswordScreen,
  MyAlbumsDetailedScreen,
  LikedAlbumsDetailedScreen,
  SelectGenreForProfileScreen,
} from 'src/screens'
import { stackDefaultOptions, playlistConfig } from './configs'
import { routes } from 'src/constants'

const ProfileNavigator = createStackNavigator(
  {
    [routes.PROFILE.PROFILE]: {
      screen: ProfileTabScreen,
      navigationOptions: {
        headerTransparent: true,
        headerTintColor: 'white',
        headerRight: <HeaderRightWithSettings />,
      },
    },
    [routes.PROFILE.ALBUM_PLAYLIST]: {
      screen: AlbumPlaylistScreen,
      navigationOptions: playlistConfig,
    },
    [routes.PROFILE.SETTINGS]: {
      screen: SettingsScreen,
      navigationOptions: {
        title: 'Настройки',
      },
    },
    [routes.PROFILE.REMOVE_ACCOUNT]: {
      screen: RemoveAccountScreen,
      navigationOptions: {
        title: 'Удаление аккаунта',
      },
    },
    [routes.PROFILE.MY_GENRES]: {
      screen: MyGenresScreen,
      navigationOptions: { title: 'Любимые жанры' },
    },
    [routes.PROFILE.SELECT_GENRE]: {
      screen: SelectGenreForProfileScreen,
      navigationOptions: { title: 'Выбор жанра' },
    },
    [routes.PROFILE.AUTH_SETTINGS]: {
      screen: AuthSettingsScreen,
      navigationOptions: { title: 'Настройка входа' },
    },
    [routes.PROFILE.CHANGE_PASSWORD]: {
      screen: ChangePasswordScreen,
      navigationOptions: { title: 'Создание пароля' },
    },
    [routes.PROFILE.SOCIAL_AUTH]: SocialAuthWebScreen,
    [routes.PROFILE.MY_ALBUMS_DETAILED]: {
      screen: MyAlbumsDetailedScreen,
      navigationOptions: { title: 'Мои альбомы' },
    },
    [routes.PROFILE.LIKED_ALBUMS_DETAILED]: {
      screen: LikedAlbumsDetailedScreen,
      navigationOptions: { title: 'Любимые альбомы' },
    },
    [routes.PROFILE.MY_MUSIC_PLAYLIST]: {
      screen: MyMusicPlaylistScreen,
      navigationOptions: playlistConfig,
    },
    [routes.PROFILE.LIKED_MUSIC_PLAYLIST]: {
      screen: LikedMusicPlaylistScreen,
      navigationOptions: playlistConfig,
    },
  },
  {
    initialRouteName: routes.PROFILE.PROFILE,
    headerMode: 'screen',
    defaultNavigationOptions: stackDefaultOptions,
  },
)

export default ProfileNavigator
