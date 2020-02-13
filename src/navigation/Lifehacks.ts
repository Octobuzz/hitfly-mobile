import { createStackNavigator } from 'react-navigation-stack'
import { LifehacksScreen } from 'src/screens'
import LifehackDetailed from 'src/screens/Lifehacks/LifehackDetailed'
import { routes } from 'src/constants'
import { stackDefaultOptions } from './configs'

const LifehacksNavigator = createStackNavigator(
  {
    [routes.LIFEHACKS.LIFEHACKS]: {
      screen: LifehacksScreen,
      navigationOptions: { title: 'Лайфхаки' },
    },
    [routes.LIFEHACKS.LIFEHACK_DETAILED]: {
      screen: LifehackDetailed,
    },
  },
  {
    initialRouteName: routes.LIFEHACKS.LIFEHACKS,
    defaultNavigationOptions: stackDefaultOptions,
  },
)

export default LifehacksNavigator
