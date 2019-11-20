import { useEffect, useContext } from 'react'
import { NavigationContext } from 'react-navigation'
import { useMutation } from '@apollo/react-hooks'
import {
  HeaderSettings,
  SET_HEADER_SETTINGS,
  SetHeaderSettingsVariables,
} from 'src/apollo'

const useChangingHeaderSettings = (nextSettings: Partial<HeaderSettings>) => {
  const [setSettings] = useMutation<any, SetHeaderSettingsVariables>(
    SET_HEADER_SETTINGS,
  )

  const navigation = useContext(NavigationContext)

  useEffect(() => {
    const cb = navigation.addListener('didFocus', () => {
      setSettings({
        variables: { settings: nextSettings },
      })
    })

    return () => {
      cb.remove()
    }
  })

  return null
}

export default useChangingHeaderSettings
