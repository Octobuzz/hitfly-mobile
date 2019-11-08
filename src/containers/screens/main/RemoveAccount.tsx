import RemoveAccountScreen from 'src/screens/RemoveAccount'
import { withChangingHeaderSettings } from 'src/HOCs'

export default withChangingHeaderSettings({ state: 'main', mode: 'dark' })(
  RemoveAccountScreen,
)
