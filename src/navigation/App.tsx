import React from 'react'
import { StatusBar, Platform } from 'react-native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import NavigationService from './navigationService'
import AuthNavigator from './Auth'
import Storybook from '../../storybook'
import routeNames from './routeNames'
import styled from 'src/styled-components'
import { style } from 'src/constants'
import { storage } from 'src/utils'

const SwitchRoutes = {
  [routeNames.APP.AUTH]: AuthNavigator,
  [routeNames.APP.MAIN]: () => null,
  [routeNames.APP.STORYBOOK]: Storybook,
}

const AppContainer = createAppContainer(
  createSwitchNavigator(SwitchRoutes, {
    initialRouteName: routeNames.APP.AUTH,
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
  hitSlop: style.HIT_SLOP,
}))`
  width: 10;
  height: 10;
  margin: 0px 10px;
  border-radius: 5;
  background-color: rgba(0, 0, 0, 0.5);
`

const StorybookButton = styled(DebugButton).attrs(() => ({
  onPress: () =>
    NavigationService.navigate({ routeName: routeNames.APP.STORYBOOK }),
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
      </>
    )
  }
}

export default AppNavigator
