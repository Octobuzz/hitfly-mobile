import { Navigation } from 'react-native-navigation'
import { Navigator } from './src/navigation'
import registerScreens from './src/navigation/registerScreens'

registerScreens()

Navigation.events().registerAppLaunchedListener(() =>
  Navigator.startSplashScreen(),
)

