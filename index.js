// баг здесь https://github.com/kmagiera/react-native-gesture-handler/issues/320#issuecomment-443815828
import 'react-native-gesture-handler'
import { AppRegistry } from 'react-native'
import App from 'src/App'
import { names } from 'src/constants'

AppRegistry.registerComponent(names.APP_NAME, () => App)
