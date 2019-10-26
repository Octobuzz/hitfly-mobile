import L from 'lodash'
import {
  withHidingSplashScreen,
  withChangingHeaderSettings,
} from 'src/containers/HOCs'
import Login from './Login'

export default L.flowRight(
  withChangingHeaderSettings({ state: 'auth', mode: 'dark' }),
  withHidingSplashScreen,
)(Login)
