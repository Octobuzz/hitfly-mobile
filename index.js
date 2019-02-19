import {Navigation} from 'react-native-navigation';
import App1 from './App1';
import App2 from './App2';
import RNTrackPlayer from 'react-native-track-player';

Navigation.registerComponent(`navigation.playground.WelcomeScreen`, () => App2);

RNTrackPlayer.registerPlaybackService(() => require('./TrackService'));

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: "navigation.playground.WelcomeScreen"
      }
    }
  });
});