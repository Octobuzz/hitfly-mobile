import L from 'lodash'
import React, { useCallback } from 'react'
import { ViewStyle, StyleProp } from 'react-native'
import { NavigationInjectedProps, withNavigation } from 'react-navigation'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Loader, SocialButton, TextWithLines } from 'src/components'
import { routes } from 'src/constants'
import { SocialConnect } from 'src/apollo'
import styled from 'src/styled-components'

const Wrapper = styled.View``

const Row = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding-horizontal: 10px;
  margin-bottom: 32px;
`

interface SocialConnectData {
  socialConnect?: SocialConnect[]
}

const GET_SOCIAL_LINKS = gql`
  {
    socialConnect: SocialConnectQuery(filters: { mobile: true }) {
      type: social_type
      url: link
    }
  }
`

interface Props extends NavigationInjectedProps {
  bottomText: string
  style?: StyleProp<ViewStyle>
}

const SocialAuth: React.FC<Props> = ({ navigation, bottomText, style }) => {
  const { data, loading } = useQuery<SocialConnectData>(GET_SOCIAL_LINKS)

  const navigateToSocialAuth = useCallback(({ url }: SocialConnect) => {
    navigation.navigate(routes.AUTH.SOCIAL_AUTH, {
      url,
      nextRoute: routes.APP.MAIN,
    })
  }, [])

  if (loading) {
    return <Loader />
  }

  let socialData: SocialConnect[] = L.get(data, 'socialConnect', [])

  // FIXME: времено, пока не починят инстаграмм
  socialData = socialData.filter(({ type }) => type !== 'instagram')

  if (socialData.length) {
    return (
      <Wrapper style={style}>
        <Row>
          {socialData.map(buttonData => {
            return (
              <SocialButton
                onPress={navigateToSocialAuth}
                key={buttonData.type}
                buttonData={buttonData}
              />
            )
          })}
        </Row>
        <TextWithLines>{bottomText}</TextWithLines>
      </Wrapper>
    )
  }

  return null
}

export default withNavigation(SocialAuth)
