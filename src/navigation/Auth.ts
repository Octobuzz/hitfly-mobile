import { createStackNavigator } from 'react-navigation'
import { WelcomeScreen } from 'src/screens'
import routeNames from './routeNames'

const AuthNavigator = createStackNavigator({
  [routeNames.AUTH.WELCOME]: {
    screen: WelcomeScreen,
    navigationOptions: { header: null },
  },
})

export default AuthNavigator
