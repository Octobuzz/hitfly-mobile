import React from 'react'
import { StatusBar, Platform } from 'react-native'
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import FlashMessage from 'react-native-flash-message'
import NavigationService from './navigationService'
import { WelcomeScreen } from 'src/screens'
import AuthNavigator from './Auth'
import TabBarNavigator from './TabBar'
import EasterEggNavigator from './EasterEgg'
import Storybook from '../../storybook'
import styled from 'src/styled-components'
import { styles, storageKeys, routes } from 'src/constants'
import { storage } from 'src/apollo'
import { hideSplashScreenWithTimeout } from 'src/helpers'

const SwitchRoutes = {
  [routes.APP.WELCOME]: {
    screen: WelcomeScreen,
    navigationOptions: { header: null },
  },
  [routes.APP.AUTH]: AuthNavigator,
  [routes.APP.MAIN]: TabBarNavigator,
  [routes.APP.STORYBOOK]: Storybook,
  [routes.APP.EASTER_EGG]: EasterEggNavigator,
}

// на андроиде плохо работает анимация
const createSwitch =
  Platform.OS === 'ios' ? createAnimatedSwitchNavigator : createSwitchNavigator

const AppContainer = createAppContainer(
  // @ts-ignore
  createSwitch(SwitchRoutes, {
    initialRouteName: routes.APP.WELCOME,
  }),
)

const StyledFlash = styled(FlashMessage).attrs(({ theme }) => ({
  titleStyle: {
    color: theme.colors.white,
    fontFamily: theme.fonts.regular,
  },
}))`
  background-color: ${({ theme }) => theme.colors.black};
`

const DevTools = styled.View`
  flex-direction: row;
  position: absolute;
  top: 40;
  right: 20;
  z-index: 10;
`

const DebugButton = styled.TouchableOpacity.attrs(() => ({
  onPress: storage.clearStorage,
  hitSlop: styles.HIT_SLOP,
}))`
  width: 10;
  height: 10;
  margin: 0px 10px;
  border-radius: 5;
  background-color: rgba(0, 0, 0, 0.5);
`

const StorybookButton = styled(DebugButton).attrs(() => ({
  onPress: () => {
    NavigationService.navigate({ routeName: routes.APP.STORYBOOK })
  },
}))`
  background-color: rgba(150, 10, 50, 0.5);
`

class AppNavigator extends React.Component {
  constructor(props: any) {
    super(props)
    if (Platform.OS === 'ios') {
      StatusBar.setBarStyle('dark-content', true)
    } else {
      StatusBar.setBackgroundColor('#000000', true)
    }
  }

  componentDidMount() {
    this.handleInitialNavigation()
  }

  private handleInitialNavigation = async () => {
    const [token, skipWelcome] = await Promise.all([
      storage.getToken(),
      storage.getItem(storageKeys.SKIP_WELCOME),
    ])
    if (token) {
      NavigationService.navigate({ routeName: routes.APP.MAIN })
    } else if (skipWelcome) {
      NavigationService.navigate({ routeName: routes.APP.AUTH })
    } else {
      hideSplashScreenWithTimeout()
    }
  }

  render() {
    return (
      <>
        {__DEV__ && (
          <DevTools>
            <DebugButton />
            <StorybookButton />
          </DevTools>
        )}
        <AppContainer ref={NavigationService.setTopLevelNavigator} />
        <StyledFlash />
      </>
    )
  }
}

export default AppNavigator
