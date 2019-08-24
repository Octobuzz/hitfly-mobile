import { NativeModules } from 'react-native'
import Reactotron from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'
import sagaPlugin from 'reactotron-redux-saga'

const scriptURL = NativeModules.SourceCode.scriptURL
const scriptHostname = scriptURL.split('://')[1].split(':')[0]
Reactotron.configure({ host: scriptHostname })
  .useReactNative({
    networking: {
      // optionally, you can turn it off with false.
      ignoreUrls: /symbolicate/,
    },
  })
  .use(
    reactotronRedux({
      except: ['EFFECT_TRIGGERED', 'EFFECT_RESOLVED', 'EFFECT_REJECTED'],
    }),
  )
  .use(sagaPlugin())
  .connect()

Reactotron.clear()

// eslint-disable-next-line no-console
console.tron = Reactotron
