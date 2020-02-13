import { createStackNavigator } from 'react-navigation-stack'
import LifehacksContainer2 from 'src/screens/Lifehacks/LifehacksContainer2'
import { routes } from 'src/constants'
import { stackDefaultOptions } from './configs'

const LifehacksNavigator = createStackNavigator(
  {
    [routes.LIFEHACKS2.LIFEHACKS]: {
      screen: LifehacksContainer2,
      navigationOptions: { title: 'Лайфхаки' },
    },
  },
  {
    initialRouteName: routes.LIFEHACKS2.LIFEHACKS,
    defaultNavigationOptions: stackDefaultOptions,
  },
)

export default LifehacksNavigator
