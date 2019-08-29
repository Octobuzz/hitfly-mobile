import { createStackNavigator } from 'react-navigation'
import { WelcomeScreen, LoginScreen } from 'src/screens'
import routeNames from './routeNames'
import theme from 'src/theme'

const AuthNavigator = createStackNavigator(
  {
    [routeNames.AUTH.WELCOME]: {
      screen: WelcomeScreen,
      navigationOptions: { header: null },
    },
    [routeNames.AUTH.LOGIN]: {
      screen: LoginScreen,
      navigationOptions: { title: 'Вход' },
    },
  },
  {
    initialRouteName: routeNames.AUTH.WELCOME,
    defaultNavigationOptions: {
      headerBackTitle: null,
      headerStyle: {
        borderBottomWidth: 0,
      },
      headerTintColor: theme.colors.textMain,
      headerTitleStyle: {
        fontFamily: theme.fonts.bold,
        fontWeight: undefined, // убрать дефолтный вес от react-navigation
        fontSize: 18,
      },
    },
  },
)

export default AuthNavigator
