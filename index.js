// баг здесь https://github.com/kmagiera/react-native-gesture-handler/issues/320#issuecomment-443815828
import 'react-native-gesture-handler'
import { AppRegistry } from 'react-native'
import TrackPlayer from 'react-native-track-player'
import { names } from 'src/constants'
import App from 'src/App'

AppRegistry.registerComponent(names.APP_NAME, () => App)

TrackPlayer.registerPlaybackService(() => require('./trackService.js'))
