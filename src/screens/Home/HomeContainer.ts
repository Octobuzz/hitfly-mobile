import L from 'lodash'
import {
  withChangingHeaderSettings,
  withHidingSplashScreen,
} from 'src/containers/HOCs'
import HomeScreen from './Home'

export default L.flowRight(
  withChangingHeaderSettings({ state: 'main', mode: 'dark' }),
  withHidingSplashScreen,
)(HomeScreen)
