import L from 'lodash'
import React, { useCallback } from 'react'
import { withNavigation, NavigationInjectedProps } from 'react-navigation'
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
} from 'src/apollo'
import styled, { withTheme, ITheme } from 'src/styled-components'
import { Image } from 'src/components'

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

interface Props extends NavigationInjectedProps {
  theme: ITheme
}

const HeaderRightButtons: React.FC<Props> = ({ navigation, theme }) => {
  const navigateToProfile = useCallback((): void => {
    navigation.navigate(routes.MAIN.PROFILE)
  }, [])

  const navigateToSettings = useCallback((): void => {
    navigation.navigate(routes.MAIN.SETTINGS)
  }, [])
  // FIXME: смотри костыль в src/apollo/errorLink.tsx
  const { data: profileData } = useQuery<GetProfileAvatarData>(
    GET_PROFILE_AVATAR,
  )
  const profileUrl = L.get(profileData, 'profile.avatar[0].imageUrl')

  const { data } = useQuery<HeaderSettingsData>(GET_HEADER_SETTINGS)
  const mode = L.get(data, 'headerSettings.mode', 'dark')
  const state = L.get(data, 'headerSettings.state', 'main')
  const color = mode === 'dark' ? theme.colors.black : theme.colors.white

  return (
    <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
      {state === 'main' ? (
        profileUrl ? (
          <Item
            title="Профиль"
            ButtonElement={
              <AvatarButton onPress={navigateToProfile}>
                <AvatarImage source={{ uri: profileUrl }} />
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
        )
      ) : (
        <Item
          color={color}
          iconSize={23}
          title="Настройки"
          iconName="md-cog"
          onPress={navigateToSettings}
        />
      )}
    </HeaderButtons>
  )
}

export default L.flowRight(
  withNavigation,
  withTheme,
)(HeaderRightButtons)
