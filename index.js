import {Navigation} from 'react-native-navigation';
import Navigator from './src/navigation/Navigator';
import registerScreens from './src/navigation/registerScreens';

registerScreens();

Navigation.events().registerAppLaunchedListener(() => Navigator.startSplashScreen());