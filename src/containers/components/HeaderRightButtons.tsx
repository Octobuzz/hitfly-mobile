import L from 'lodash'
import React, { useCallback } from 'react'
import { useQuery } from '@apollo/react-hooks'
import Icon from 'react-native-vector-icons/Ionicons'
import {
  Item,
  HeaderButton,
  HeaderButtons,
} from 'react-navigation-header-buttons'
import { routes } from 'src/constants'
import { GET_HEADER_SETTINGS, HeaderSettingsData } from 'src/apollo'
import { useNavigation } from 'src/hooks'
import theme from 'src/theme'

const IoniconsHeaderButton = (passMeFurther: any) => (
  <HeaderButton {...passMeFurther} IconComponent={Icon} />
)

export const HeaderRightWithSettings: React.FC = () => {
  const navigation = useNavigation()

  const navigateToSettings = useCallback((): void => {
    navigation.navigate(routes.PROFILE.SETTINGS)
  }, [])

  const data = useQuery<HeaderSettingsData>(GET_HEADER_SETTINGS)
  const mode = L.get(data, 'data.headerSettings.mode', 'dark')
  const color = mode === 'dark' ? theme.colors.black : theme.colors.white

  return (
    <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
      <Item
        color={color}
        iconSize={23}
        title="Настройки"
        iconName="md-cog"
        onPress={navigateToSettings}
      />
    </HeaderButtons>
  )
}
