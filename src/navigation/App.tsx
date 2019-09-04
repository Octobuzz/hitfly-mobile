import React from 'react'
import { StatusBar, Platform } from 'react-native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import NavigationService from './navigationService'
import AuthNavigator from './Auth'
import MainNavigator from './Main'
import Storybook from '../../storybook'
import ROUTES from './routeNames'
import styled from 'src/styled-components'
import { styles, storageKeys } from 'src/constants'
import { storage } from 'src/utils'

const SwitchRoutes = {
  [ROUTES.APP.AUTH]: AuthNavigator,
  [ROUTES.APP.MAIN]: MainNavigator,
  [ROUTES.APP.STORYBOOK]: Storybook,
}

const AppContainer = createAppContainer(
  createSwitchNavigator(SwitchRoutes, {
    initialRouteName: ROUTES.APP.AUTH,
  }),
)

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

const persistenceKey = 'react-navigation-presistence'
const StorybookButton = styled(DebugButton).attrs(() => ({
  onPress: () => {
    storage.removeItem(persistenceKey)
    NavigationService.navigate({ routeName: ROUTES.APP.STORYBOOK })
  },
}))`
  background-color: rgba(150, 10, 50, 0.5);
`

class AppNavigator extends React.Component {
  constructor(props: any) {
    super(props)
    if (Platform.OS === 'ios') {
      StatusBar.setBarStyle('dark-content')
    } else {
      StatusBar.setBarStyle('light-content')
    }
  }

  componentDidMount() {
    this.handleInitialNavigation()
  }

  private handleInitialNavigation = async () => {
    const token = await storage.getItem(storageKeys.AUTH_TOKEN)
    if (token) {
      NavigationService.navigate({ routeName: ROUTES.MAIN.HOME })
    }
    // TODO: тут надо убрать сплешскрин вне зависимости от условия
  }

  // восстановление экранов в дев режиме
  // https://reactnavigation.org/docs/en/state-persistence.html
  private getPersistenceFunctions = (): {
    persistNavigationState: (state: any) => Promise<void>
    loadNavigationState: () => Promise<any>
  } | void => {
    return __DEV__
      ? {
          persistNavigationState: this.persistNavigationState,
          loadNavigationState: this.loadNavigationState,
        }
      : undefined
  }
  private persistNavigationState = async (navState: any): Promise<void> =>
    storage.setItem(persistenceKey, navState)

  private loadNavigationState = (): Promise<any> =>
    storage.getItem(persistenceKey)

  render() {
    return (
      <>
        {__DEV__ && (
          <DevTools>
            <DebugButton />
            <StorybookButton />
          </DevTools>
        )}
        <AppContainer
          {...this.getPersistenceFunctions()}
          ref={NavigationService.setTopLevelNavigator}
        />
      </>
    )
  }
}

export default AppNavigator
