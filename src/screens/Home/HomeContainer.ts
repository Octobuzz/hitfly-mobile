import { withChangingHeaderSettings } from 'src/containers/HOCs'
import HomeScreen from './Home'

export default withChangingHeaderSettings({ state: 'main', mode: 'dark' })(
  HomeScreen,
)
