import L from 'lodash'
import React, { useCallback } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Profile, GET_PROFILE_HEAD } from 'src/apollo'
import { Loader, TextBase, Button, View } from 'src/components'
import { routes } from 'src/constants'
import styled from 'src/styled-components'
import { useNavigation } from 'src/hooks'

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

const withAuthorizedCheck = ({
  logoutText,
  passProfile,
}: {
  logoutText: string
  passProfile?: boolean
}) => (WrappedComponent: React.ComponentType<any>) => (props: any) => {
  const { data, loading } = useQuery<{ profile: Profile }>(GET_PROFILE_HEAD, {
    fetchPolicy: 'cache-and-network',
  })

  const profile = L.get(data, 'profile')

  const navigation = useNavigation()

  const navigateToLogin = useCallback(() => {
    navigation.navigate(routes.APP.AUTH)
  }, [])

  if (loading) {
    return <Loader isAbsolute />
  }
  if (!profile) {
    return (
      <Wrapper>
        <LogoutText>
          {logoutText} <LogoutBoldText>Авторизация</LogoutBoldText>
        </LogoutText>
        <IndetedButton onPress={navigateToLogin} title="Войти" />
      </Wrapper>
    )
  }
  const nextProps = { ...props }
  if (passProfile) {
    nextProps.profile = profile
  }
  return <WrappedComponent {...nextProps} />
}

export default withAuthorizedCheck
