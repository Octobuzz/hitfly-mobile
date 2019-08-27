import { NativeModules } from 'react-native'
import Reactotron from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'
import sagaPlugin from 'reactotron-redux-saga'

if (__DEV__) {
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
    .use(sagaPlugin({}))
    .connect()

  if (Reactotron.clear) {
    Reactotron.clear()
  }

  // tslint:disable-next-line
  console.tron = Reactotron
}
