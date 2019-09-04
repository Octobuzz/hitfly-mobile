import L from 'lodash'
import React, { useCallback } from 'react'
import { ViewStyle, StyleProp } from 'react-native'
import { NavigationScreenProps, withNavigation } from 'react-navigation'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Loader, SocialButton, TextWithLines } from 'src/components'
import { ROUTES } from 'src/navigation'
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

interface Props extends NavigationScreenProps {
  bottomText: string
  style?: StyleProp<ViewStyle>
}

const SocialAuth: React.FC<Props> = ({ navigation, bottomText, style }) => {
  const { data, loading } = useQuery<SocialConnectData>(GET_SOCIAL_LINKS)

  const navigateToSocialAuth = useCallback(({ url }: SocialConnect) => {
    navigation.navigate(ROUTES.AUTH.SOCIAL_AUTH, { url })
  }, [])

  if (loading) {
    return <Loader />
  }

  const socialData = L.get(data, 'socialConnect')
  if (socialData) {
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
