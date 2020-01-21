import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs'
import {
  Player,
  LogoutModal,
  BottomPlayer,
  AuthErrorModal,
  DetailedTrackMenu,
} from 'src/containers'
import {
  LogoutModalRef,
  AuthErrorModalRef,
  DetailedTrackMenuRef,
} from 'src/globalRefs'
import MainNavigator from './Main'
import PlayerNavigator from './Player'
import ProfileNavigator from './Profile'
import { routes } from 'src/constants'
import { View } from 'src/components'

const TabBarNavigator = createBottomTabNavigator(
  {
    [routes.TABS.HOME]: {
      screen: MainNavigator,
      navigationOptions: {
        title: 'Главное',
      },
    },
    [routes.TABS.PROFILE]: {
      screen: ProfileNavigator,
      navigationOptions: {
        title: 'Профиль',
      },
    },
  },
  {
    tabBarComponent: props => (
      <>
        <BottomPlayer />
        <BottomTabBar {...props} />
      </>
    ),
    initialRouteName: routes.TABS.HOME,
  },
)

const TabBar: React.FC<any> = props => (
  <View noPadding>
    <TabBarNavigator {...props} />
    <DetailedTrackMenu ref={DetailedTrackMenuRef.ref} />
    <AuthErrorModal ref={AuthErrorModalRef.ref} />
    <LogoutModal ref={LogoutModalRef.ref} />
    <Player />
  </View>
)

// @ts-ignore
TabBar.router = TabBarNavigator.router

const MainStack = createStackNavigator(
  {
    TabBar,
    PlayerNavigator,
  },
  {
    initialRouteName: 'TabBar',
    headerMode: 'none',
    mode: 'modal',
  },
)

export default MainStack
