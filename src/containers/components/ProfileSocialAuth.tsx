import L from 'lodash'
import React, { useCallback, useEffect } from 'react'
import { ViewStyle, StyleProp } from 'react-native'
import {
  NavigationInjectedProps,
  withNavigation,
  withNavigationFocus,
  NavigationFocusInjectedProps,
} from 'react-navigation'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { SocialButton } from 'src/components'
import { routes } from 'src/constants'
import {
  SocialConnect,
  SocialLinksData,
  GET_PROFILE_SOCIAL_LINKS,
  REMOVE_SOCIAL_LINK,
  RemoveSocialLinkVariables,
} from 'src/apollo'
import styled from 'src/styled-components'

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-around;
`

interface Props extends NavigationInjectedProps, NavigationFocusInjectedProps {
  style?: StyleProp<ViewStyle>
}

const ProfileSocialAuth: React.FC<Props> = ({
  style,
  navigation,
  isFocused,
}) => {
  const { data, refetch } = useQuery<SocialLinksData>(
    GET_PROFILE_SOCIAL_LINKS,
    {
      fetchPolicy: 'cache-and-network',
    },
  )

  useEffect(() => {
    if (isFocused) {
      refetch()
    }
  }, [isFocused])

  const navigateToSocialAuth = useCallback(({ url }: SocialConnect) => {
    navigation.navigate(routes.MAIN.SOCIAL_AUTH, {
      url,
      nextRoute: routes.MAIN.AUTH_SETTINGS,
    })
  }, [])

  const [removeConnectionMutation] = useMutation<
    any,
    RemoveSocialLinkVariables
  >(REMOVE_SOCIAL_LINK)

  const removeConnection = useCallback(
    ({ type }: SocialConnect) => {
      removeConnectionMutation({ variables: { type } })
    },
    [removeConnectionMutation],
  )

  const handlePressSocialButton = useCallback(
    (socialConnectData: SocialConnect) => {
      if (socialConnectData.isLinked) {
        removeConnection(socialConnectData)
      } else {
        navigateToSocialAuth(socialConnectData)
      }
    },
    [navigateToSocialAuth, removeConnection],
  )

  let socialData: SocialConnect[] = L.get(data, 'socialConnect', [])

  // FIXME: времено, пока не починят инстаграмм
  socialData = socialData.filter(({ type }) => type !== 'instagram')

  if (!socialData.length) {
    return null
  }

  return (
    <Wrapper style={style}>
      {socialData.map(buttonData => (
        <SocialButton
          useFading
          onPress={handlePressSocialButton}
          key={buttonData.type}
          buttonData={buttonData}
        />
      ))}
    </Wrapper>
  )
}

export default L.flow(withNavigation, withNavigationFocus)(ProfileSocialAuth)
