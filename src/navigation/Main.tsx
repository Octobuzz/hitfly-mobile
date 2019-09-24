import { createStackNavigator } from 'react-navigation-stack'
import { HomeScreen, ProfileScreen } from 'src/screens'
import {
  NewPlaylistScreen,
  GenrePlaylistScreen,
  Top50PlaylistScreen,
  TopWeekPlaylistScreen,
  CollectionDetailsScreen,
  CollectionPlaylistScreen,
  ListenedNowPlaylistScreen,
} from 'src/containers'
import { stackDefaultOptions, playlistConfig } from './configs'
import routeNames from './routeNames'

// FIXME: временно, пока не вынесу конпки из хедера
import styled from 'src/styled-components'
import React from 'react'
import NavigationService from './navigationService'

const PButton = styled.Button.attrs(() => ({
  title: 'P',
  onPress: () =>
    NavigationService.navigate({ routeName: routeNames.MAIN.PROFILE }),
}))``

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
      screen: ProfileScreen,
      navigationOptions: {
        headerTransparent: true,
        headerTintColor: 'white',
      },
    },
  },
  {
    initialRouteName: routeNames.MAIN.HOME,
    headerMode: 'screen',
    defaultNavigationOptions: {
      ...stackDefaultOptions,
      headerRight: <PButton />,
    },
  },
)

export default MainNavigator
