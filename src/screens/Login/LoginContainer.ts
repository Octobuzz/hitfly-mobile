import { withChangingHeaderSettings } from 'src/containers/HOCs'
import Login from './Login'

export default withChangingHeaderSettings({ state: 'auth', mode: 'dark' })(
  Login,
)
