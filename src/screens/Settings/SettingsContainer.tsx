import React from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import SettingsScreen from './Settings'
import { LogoutPanelRef } from 'src/globalRefs'
import { useChangingHeaderSettings } from 'src/hooks'

interface Props extends NavigationStackScreenProps {}

const SettingsContainer: React.FC<Props> = props => {
  useChangingHeaderSettings({ state: 'main', mode: 'dark' })
  return <SettingsScreen {...props} onPressLogout={LogoutPanelRef.showPanel} />
}

export default SettingsContainer
