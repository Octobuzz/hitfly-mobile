import React, { useCallback } from 'react'
import { ViewStyle, StyleProp } from 'react-native'
import { NavigationScreenProps, withNavigation } from 'react-navigation'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import {
  Loader,
  SocialButton,
  TextWithLines,
  SocialButtonData,
} from 'src/components'
import { ROUTES } from 'src/navigation'
import { serverTransformers } from 'src/utils'
import styled from 'src/styled-components'

const Wrapper = styled.View``

const SocialRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding-horizontal: 10px;
  margin-bottom: 32px;
`

export type SocialType =
  | 'facebook'
  | 'vkontakte'
  | 'instagram'
  | 'odnoklassniki'

export interface SocialConnect {
  social_type: SocialType
  link: string
}

interface SocialConnectData {
  SocialConnectQuery?: SocialConnect[]
}

interface Props extends NavigationScreenProps {
  bottomText: string
  style?: StyleProp<ViewStyle>
}

const GET_SOCIAL_LINKS = gql`
  {
    SocialConnectQuery {
      social_type
      link
    }
  }
`

const SocialAuth: React.FC<Props> = ({ navigation, bottomText, style }) => {
  const { data, loading } = useQuery<SocialConnectData>(GET_SOCIAL_LINKS)

  const navigateToSocialAuth = useCallback(({ url }: SocialButtonData) => {
    navigation.navigate(ROUTES.AUTH.SOCIAL_AUTH, { url })
  }, [])

  if (loading) {
    return <Loader />
  }

  if (data && data.SocialConnectQuery) {
    return (
      <Wrapper style={style}>
        <SocialRow>
          {data.SocialConnectQuery.map(serverData => {
            const buttonData = serverTransformers.serverSocialDataAdapter(
              serverData,
            )
            return (
              <SocialButton
                onPress={navigateToSocialAuth}
                key={buttonData.type}
                data={buttonData}
              />
            )
          })}
        </SocialRow>
        <TextWithLines>{bottomText}</TextWithLines>
      </Wrapper>
    )
  }

  return null
}

export default withNavigation(SocialAuth)
