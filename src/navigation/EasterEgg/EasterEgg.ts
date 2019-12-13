import { createStackNavigator } from 'react-navigation-stack'
import { Platform } from 'react-native'
import LoginScreen from './Login'
import MainScreen from './Main'
import { routes } from 'src/constants'
import { colors } from './settings'

const EasterEgg = createStackNavigator(
  {
    [routes.EASTER_EGG.EGG_LOGIN]: {
      screen: LoginScreen,
      navigationOptions: {
        title: 'Вход',
      },
    },
    [routes.EASTER_EGG.EGG_MAIN]: {
      screen: MainScreen,
      navigationOptions: {
        title: 'Настройки',
      },
    },
  },
  {
    initialRouteName: routes.EASTER_EGG.EGG_LOGIN,
    defaultNavigationOptions: {
      headerTintColor: colors.main,
      headerTitleStyle: {
        fontFamily: Platform.OS === 'android' ? 'Roboto' : undefined,
      },
      headerStyle: {
        borderBottomWidth: 0,
        elevation: 0,
        backgroundColor: colors.background,
      },
    },
    cardStyle: {
      backgroundColor: colors.background,
    },
  },
)

export default EasterEgg
