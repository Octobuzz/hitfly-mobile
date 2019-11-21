import L from 'lodash'
import React, { useCallback, useEffect } from 'react'
import { ViewStyle, StyleProp } from 'react-native'
import {
  NavigationInjectedProps,
  withNavigation,
  withNavigationFocus,
  NavigationFocusInjectedProps,
} from 'react-navigation'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { SocialButton } from 'src/components'
import { routes } from 'src/constants'
import { SocialConnect } from 'src/apollo'
import styled from 'src/styled-components'

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-around;
`

interface SocialConnectData {
  socialConnect?: SocialConnect[]
}

const GET_SOCIAL_LINKS = gql`
  {
    socialConnect: SocialConnectQuery(filters: { mobile: true }) {
      type: social_type
      url: link
      isLinked: connected
    }
  }
`

interface Props extends NavigationInjectedProps, NavigationFocusInjectedProps {
  style?: StyleProp<ViewStyle>
}

const ProfileSocialAuth: React.FC<Props> = ({
  style,
  navigation,
  isFocused,
}) => {
  const { data, refetch } = useQuery<SocialConnectData>(GET_SOCIAL_LINKS, {
    fetchPolicy: 'cache-and-network',
  })

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
          onPress={navigateToSocialAuth}
          key={buttonData.type}
          buttonData={buttonData}
        />
      ))}
    </Wrapper>
  )
}

export default L.flow(
  withNavigation,
  withNavigationFocus,
)(ProfileSocialAuth)
