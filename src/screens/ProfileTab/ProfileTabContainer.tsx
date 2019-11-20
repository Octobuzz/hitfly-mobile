import L from 'lodash'
import React, { useCallback } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import ProfileTabScreen from './ProfileTab'
import { Profile, GET_PROFILE_HEAD } from 'src/apollo'
import { Loader, TextBase, Button, Link, View } from 'src/components'
import { useChangingHeaderSettings } from 'src/Hooks'
import styled from 'src/styled-components'
import { ROUTES } from 'src/navigation'

const LogoutText = styled(TextBase)`
  text-align: center;
`

const LogoutBoldText = styled(LogoutText)`
  font-family: ${({ theme }) => theme.fonts.bold};
`

const IndetedButton = styled(Button)`
  margin-top: 32px;
  margin-bottom: 24px;
`

const Wrapper = styled(View)`
  justify-content: center;
`

interface Props extends NavigationStackScreenProps {}

const ProfileTab: React.FC<Props> = ({ navigation, ...rest }) => {
  useChangingHeaderSettings({ state: 'profile', mode: 'light' })

  const { data, loading } = useQuery<{ profile: Profile }>(GET_PROFILE_HEAD, {
    fetchPolicy: 'cache-and-network',
  })

  const profile = L.get(data, 'profile')

  const navigateToLogin = useCallback(() => {
    navigation.navigate(ROUTES.APP.AUTH)
  }, [])
  const goBack = useCallback(() => {
    navigation.goBack()
  }, [])

  if (loading) {
    return <Loader isAbsolute />
  }
  if (!profile) {
    return (
      <Wrapper>
        <LogoutText>
          Для выполнения следующего действия требуется{' '}
          <LogoutBoldText>Авторизация</LogoutBoldText>
        </LogoutText>
        <IndetedButton onPress={navigateToLogin} title="Войти" />
        <Link title="Назад" onPress={goBack} />
      </Wrapper>
    )
  }
  return <ProfileTabScreen {...rest} profile={profile} />
}

export default ProfileTab
