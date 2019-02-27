import {Navigation} from 'react-native-navigation';
import {Navigator, registerScreens} from './src/navigation';

registerScreens();

Navigation.events().registerAppLaunchedListener(() => Navigator.startSplashScreen());