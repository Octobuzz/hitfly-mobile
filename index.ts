/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import { AppRegistry } from 'react-native'
import App from './src/navigation'
import { names } from './src/constants'
if (__DEV__) {
  import('./reactotron.config')
}

AppRegistry.registerComponent(names.APP_NAME, () => App)
