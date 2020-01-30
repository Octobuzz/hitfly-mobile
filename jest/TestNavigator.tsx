// https://github.com/react-navigation/rfcs/issues/75
import React, { Children } from 'react'
import {
  createAppContainer,
  createSwitchNavigator,
  NavigationParams,
} from 'react-navigation'

const TestNavigator = ({
  children,
  params,
}: {
  children: any
  params?: NavigationParams
}) => {
  const Navigator = createAppContainer(
    createSwitchNavigator({
      TestScreen: { screen: () => Children.only(children), params },
    }),
  )
  return <Navigator />
}

export default TestNavigator
