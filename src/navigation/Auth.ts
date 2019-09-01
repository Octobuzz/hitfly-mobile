import { createStackNavigator } from 'react-navigation'
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
