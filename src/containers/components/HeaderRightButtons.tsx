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
import {
  GET_HEADER_SETTINGS,
  HeaderSettingsData,
  GET_PROFILE_AVATAR,
  GetProfileAvatarData,
  AvatarSizeNames,
} from 'src/apollo'
import styled from 'src/styled-components'
import { useImageSource, useNavigation } from 'src/hooks'
import { Image } from 'src/components'
import theme from 'src/theme'

const AvatarButton = styled.TouchableOpacity`
  width: 42px;
  align-items: center;
`

const AvatarImage = styled(Image)`
  width: 24px;
  height: 24px;
  border-radius: 12px;
`

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

export const HeaderRightWithProfile: React.FC = () => {
  const navigation = useNavigation()

  const navigateToProfile = useCallback((): void => {
    navigation.navigate(routes.PROFILE.PROFILE)
  }, [])

  // FIXME: смотри костыль в src/apollo/errorLink.tsx
  const profileData = useQuery<GetProfileAvatarData>(GET_PROFILE_AVATAR)
  const avatar = L.get(profileData, 'data.profile.avatar', [])
  const source = useImageSource(avatar, AvatarSizeNames.S_56)

  const { data } = useQuery<HeaderSettingsData>(GET_HEADER_SETTINGS)
  const mode = L.get(data, 'headerSettings.mode', 'dark')
  const color = mode === 'dark' ? theme.colors.black : theme.colors.white

  return (
    <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
      {source.uri ? (
        <Item
          title="Профиль"
          ButtonElement={
            <AvatarButton onPress={navigateToProfile}>
              <AvatarImage source={source} />
            </AvatarButton>
          }
        />
      ) : (
        <Item
          color={color}
          iconSize={23}
          title="Профиль"
          iconName="md-contact"
          onPress={navigateToProfile}
        />
      )}
    </HeaderButtons>
  )
}
