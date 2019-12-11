import React from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import SettingsScreen from './Settings'
import { LogoutModalRef } from 'src/globalRefs'
import { withChangingHeaderSettings } from 'src/HOCs'

interface Props extends NavigationStackScreenProps {}

const SettingsContainer: React.FC<Props> = props => (
  <SettingsScreen {...props} onPressLogout={LogoutModalRef.show} />
)

export default withChangingHeaderSettings({ state: 'main', mode: 'dark' })(
  SettingsContainer,
)
