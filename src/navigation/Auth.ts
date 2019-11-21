import { createStackNavigator } from 'react-navigation-stack'
import {
  LoginScreen,
  RegisterScreen,
  SelectGenreScreen,
  RecoveryInfoScreen,
  SocialAuthWebScreen,
  ForgotPasswordScreen,
} from 'src/screens'

import { routes } from 'src/constants'
import { stackDefaultOptions } from './configs'

const AuthNavigator = createStackNavigator(
  {
    [routes.AUTH.LOGIN]: {
      screen: LoginScreen,
      navigationOptions: { title: 'Вход' },
    },
    [routes.AUTH.REGISTER]: {
      screen: RegisterScreen,
      navigationOptions: { title: 'Создать аккаунт' },
    },
    [routes.AUTH.SELECT_GENRE]: {
      screen: SelectGenreScreen,
      navigationOptions: { title: 'Выбор жанра' },
    },
    [routes.AUTH.SOCIAL_AUTH]: SocialAuthWebScreen,
    [routes.AUTH.FORGOT_PASSWORD]: {
      screen: ForgotPasswordScreen,
      navigationOptions: { title: 'Восстановление пароля' },
    },
    [routes.AUTH.RECOVERY_INFO]: {
      screen: RecoveryInfoScreen,
      navigationOptions: { title: 'Проверьте электронную почту' },
    },
  },
  {
    initialRouteName: routes.AUTH.LOGIN,
    defaultNavigationOptions: stackDefaultOptions,
  },
)

export default AuthNavigator
