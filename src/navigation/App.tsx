import React from 'react'
import { StatusBar, Platform } from 'react-native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import NavigationService from './navigationService'
import routeNames from './routeNames'

const SwitchRoutes = {
  [routeNames.APP.AUTH]: () => null,
  [routeNames.APP.MAIN]: () => null,
}

const AppContainer = createAppContainer(
  createSwitchNavigator(SwitchRoutes, {
    initialRouteName: routeNames.APP.AUTH,
  }),
)

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
    return <AppContainer ref={NavigationService.setTopLevelNavigator} />
  }
}

export default AppNavigator
