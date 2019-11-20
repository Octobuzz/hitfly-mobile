import L from 'lodash'
import React, { useCallback } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import ProfileTabScreen from './ProfileTab'
import { Profile, GET_PROFILE_HEAD } from 'src/apollo'
import { Loader, TextBase, Button, Link, View } from 'src/components'
import {
  withDetailedTrackMenu,
  withChangingHeaderSettings,
  DetailedTrackMenuProps,
} from 'src/HOCs'
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

interface Props extends NavigationStackScreenProps, DetailedTrackMenuProps {}

const ProfileTab: React.FC<Props> = ({ navigation, ...rest }) => {
  const { data, loading } = useQuery<{ profile: Profile }>(GET_PROFILE_HEAD, {
    fetchPolicy: 'cache-and-network',
  })

  const navigateToLogin = useCallback(() => {
    navigation.navigate(ROUTES.APP.AUTH)
  }, [])
  const goBack = useCallback(() => {
    navigation.goBack()
  }, [])

  if (loading) {
    return <Loader isAbsolute />
  }
  const profile = L.get(data, 'profile')
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

export default L.flowRight(
  withChangingHeaderSettings({ state: 'profile', mode: 'light' }),
  withDetailedTrackMenu,
)(ProfileTab)
