import React, { useEffect, useCallback } from 'react'
import { withNavigationFocus } from 'react-navigation'
import { useMutation } from '@apollo/react-hooks'
import {
  HeaderMode,
  HeaderSettings,
  SetHeaderSettingsVariables,
  SET_HEADER_SETTINGS,
} from 'src/apollo'
import { Platform, StatusBar } from 'react-native'

const setStatusBarColor = (mode: HeaderMode): void => {
  if (Platform.OS === 'ios') {
    StatusBar.setBarStyle(
      mode === 'dark' ? 'dark-content' : 'light-content',
      true,
    )
  }
}
const withChangingHeaderSettings = (nextSettings: Partial<HeaderSettings>) => (
  WrappedComponent: React.ComponentType<any>,
) =>
  withNavigationFocus(
    ({ isFocused, ...rest }: any): JSX.Element => {
      const [setSettings] = useMutation<any, SetHeaderSettingsVariables>(
        SET_HEADER_SETTINGS,
      )

      const changeSettings = useCallback(() => {
        if (nextSettings.mode) {
          setStatusBarColor(nextSettings.mode)
        }
        setSettings({
          variables: { settings: nextSettings },
        })
      }, [])

      useEffect(() => {
        if (isFocused) {
          changeSettings()
        }
      }, [isFocused])
      return <WrappedComponent {...rest} />
    },
  )

export default withChangingHeaderSettings
