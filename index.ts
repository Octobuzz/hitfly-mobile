/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import { AppRegistry } from 'react-native'
import App from './src/App'
import { names } from './src/constants'

AppRegistry.registerComponent(names.APP_NAME, () => App)
