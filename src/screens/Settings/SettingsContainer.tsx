import React from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import SettingsScreen from './Settings'
import { LogoutPanelRef } from 'src/globalRefs'
import { withChangingHeaderSettings } from 'src/HOCs'

interface Props extends NavigationStackScreenProps {}

const SettingsContainer: React.FC<Props> = props => (
  <SettingsScreen {...props} onPressLogout={LogoutPanelRef.showPanel} />
)

export default withChangingHeaderSettings({ state: 'main', mode: 'dark' })(
  SettingsContainer,
)
