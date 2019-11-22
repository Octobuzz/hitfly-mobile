import React from 'react'
import { createStackNavigator, HeaderBackButton } from 'react-navigation-stack'
import { ModalPlayerScreen, ModalPlaylistScreen } from 'src/screens'
import { routes } from 'src/constants'
import theme from 'src/theme'

const PlayerNavigator = createStackNavigator(
  {
    [routes.PLAYER.MODAL_PLAYER]: {
      screen: ModalPlayerScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: ({ onPress, ...rest }) => (
          <HeaderBackButton {...rest} onPress={() => navigation.goBack(null)} />
        ),
        headerLeftContainerStyle: {
          transform: [{ rotateZ: '-90deg' }, { translateY: 10 }],
        },
        headerTransparent: true,
      }),
    },
    [routes.PLAYER.MODAL_PLAYLIST]: {
      screen: ModalPlaylistScreen,
      navigationOptions: {
        headerStyle: {
          borderBottomWidth: 0,
          elevation: 0,
          backgroundColor: theme.colors.black,
        },
      },
    },
  },
  {
    initialRouteName: routes.PLAYER.MODAL_PLAYER,
    defaultNavigationOptions: {
      headerBackTitle: null,
      headerTintColor: theme.colors.white,
    },
  },
)

export default PlayerNavigator
