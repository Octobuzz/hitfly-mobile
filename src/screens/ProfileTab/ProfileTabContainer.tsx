import L from 'lodash'
import ProfileTabScreen from './ProfileTab'
import { withChangingHeaderSettings, withAuthorizedCheck } from 'src/HOCs'

export default L.flowRight(
  withChangingHeaderSettings({ state: 'profile', mode: 'light' }),
  withAuthorizedCheck({
    passProfile: true,
    logoutText: 'Войдите чтобы увидеть данные профиля',
  }),
)(ProfileTabScreen)
