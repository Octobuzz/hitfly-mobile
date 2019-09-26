import { createStackNavigator } from 'react-navigation-stack'
import {
  LoginScreen,
  WelcomeScreen,
  RegisterScreen,
  SelectGenreScreen,
  RecoveryInfoScreen,
  SocialAuthWebScreen,
  ForgotPasswordScreen,
} from 'src/screens'
import routeNames from './routeNames'
import { stackDefaultOptions } from './configs'

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
    [routeNames.AUTH.REGISTER]: {
      screen: RegisterScreen,
      navigationOptions: { title: 'Создать аккаунт' },
    },
    [routeNames.AUTH.SELECT_GENRE]: {
      screen: SelectGenreScreen,
      navigationOptions: { title: 'Выбор жанра' },
    },
    [routeNames.AUTH.SOCIAL_AUTH]: SocialAuthWebScreen,
    [routeNames.AUTH.FORGOT_PASSWORD]: {
      screen: ForgotPasswordScreen,
      navigationOptions: { title: 'Восстановление пароля' },
    },
    [routeNames.AUTH.RECOVERY_INFO]: {
      screen: RecoveryInfoScreen,
      navigationOptions: { title: 'Проверьте электронную почту' },
    },
  },
  {
    initialRouteName: routeNames.AUTH.WELCOME,
    defaultNavigationOptions: stackDefaultOptions,
  },
)

export default AuthNavigator
