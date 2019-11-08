import L from 'lodash'
import SettingsScreen from './Settings'
import { withLogout, withChangingHeaderSettings } from 'src/HOCs'

export default L.flowRight(
  withLogout,
  withChangingHeaderSettings({ state: 'main', mode: 'dark' }),
)(SettingsScreen)
