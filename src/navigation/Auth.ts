import { createStackNavigator } from 'react-navigation-stack'
import {
  LoginScreen,
  RegisterScreen,
  RecoveryInfoScreen,
  SocialAuthWebScreen,
  ForgotPasswordScreen,
  SelectGenreForAuthScreen,
} from 'src/screens'

import routeNames from './routeNames'
import { stackDefaultOptions } from './configs'

const AuthNavigator = createStackNavigator(
  {
    [routeNames.AUTH.LOGIN]: {
      screen: LoginScreen,
      navigationOptions: { title: 'Вход' },
    },
    [routeNames.AUTH.REGISTER]: {
      screen: RegisterScreen,
      navigationOptions: { title: 'Создать аккаунт' },
    },
    [routeNames.AUTH.SELECT_GENRE]: {
      screen: SelectGenreForAuthScreen,
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
    initialRouteName: routeNames.AUTH.LOGIN,
    defaultNavigationOptions: stackDefaultOptions,
  },
)

export default AuthNavigator
