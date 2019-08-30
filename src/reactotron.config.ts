import { NativeModules } from 'react-native'
import Reactotron from 'reactotron-react-native'

declare global {
  interface Console {
    tron: any
  }
}

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
    .connect()

  if (Reactotron.clear) {
    Reactotron.clear()
  }

  // tslint:disable-next-line
  console.tron = Reactotron
}
