import { createStackNavigator } from 'react-navigation-stack'
import { LifehacksScreen } from 'src/screens'
import { routes } from 'src/constants'
import { stackDefaultOptions } from './configs'

const LifehacksNavigator = createStackNavigator(
  {
    [routes.LIFEHACKS.LIFEHACKS]: {
      screen: LifehacksScreen,
      navigationOptions: { title: 'Лайфхаки' },
    },
  },
  {
    initialRouteName: routes.LIFEHACKS.LIFEHACKS,
    defaultNavigationOptions: stackDefaultOptions,
  },
)

export default LifehacksNavigator
