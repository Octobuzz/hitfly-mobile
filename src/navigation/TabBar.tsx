import React from 'react'
import { Image } from 'react-native'
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
import LifehacksNavigator from './Lifehacks'
import Lifehacks2Navigator from './Lifehacks2'
import { routes, images } from 'src/constants'
import { View } from 'src/components'
import theme from 'src/theme'

const getTabBarIcon = (source: number) => ({
  tintColor,
  focused,
}: {
  focused: boolean
  tintColor?: string
  horizontal?: boolean
}) => (
  <Image
    source={source}
    style={{ tintColor: focused ? undefined : tintColor }}
  />
)

const TabBarNavigator = createBottomTabNavigator(
  {
    [routes.TABS.HOME]: {
      screen: MainNavigator,
      navigationOptions: {
        title: 'Главное',
        tabBarIcon: getTabBarIcon(images.TAB_LOGO),
      },
    },
    [routes.TABS.LIFEHACKS]: {
      screen: LifehacksNavigator,
      navigationOptions: {
        title: 'Лайфхаки',
        tabBarIcon: getTabBarIcon(images.TAB_LIFEHACKS),
      },
    },
    [routes.TABS.LIFEHACKS2]: {
      screen: Lifehacks2Navigator,
      navigationOptions: {
        title: 'Лайфхаки2',
        tabBarIcon: getTabBarIcon(images.TAB_LIFEHACKS),
      },
    },
    [routes.TABS.PROFILE]: {
      screen: ProfileNavigator,
      navigationOptions: {
        title: 'Профиль',
        tabBarIcon: getTabBarIcon(images.TAB_PROFILE),
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
    tabBarOptions: {
      activeTintColor: theme.colors.textMain,
      inactiveTintColor: theme.colors.tabbarInactive,
      style: {
        shadowColor: theme.colors.tabbarBorder,
      },
    },
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
