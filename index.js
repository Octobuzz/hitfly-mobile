// баг здесь https://github.com/kmagiera/react-native-gesture-handler/issues/320#issuecomment-443815828
import 'react-native-gesture-handler'
import { AppRegistry } from 'react-native'
import TrackPlayer from 'react-native-track-player'
import { names } from 'src/constants'
import App from 'src/App'

const setup = async () => {
  await TrackPlayer.setupPlayer()
  TrackPlayer.updateOptions({
    stopWithApp: true,
    capabilities: [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE,
      TrackPlayer.CAPABILITY_SEEK_TO,
      TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
      TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
    ],
  })
}

AppRegistry.registerComponent(names.APP_NAME, () => App)

setup()
TrackPlayer.registerPlaybackService(() => require('./trackService.js'))
