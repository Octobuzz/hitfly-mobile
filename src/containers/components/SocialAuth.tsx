import React, { useCallback, useMemo } from 'react'
import { NavigationScreenProps, withNavigation } from 'react-navigation'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import {
  Loader,
  SocialButton,
  SocialButtonData,
  SocialButtonType,
} from 'src/components'
import styled from 'src/styled-components'
import { ROUTES } from 'src/navigation'
import { serverTransformers } from 'src/utils'

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

const GET_SOCIAL_LINKS = gql`
  {
    SocialConnectQuery {
      social_type
      link
    }
  }
`

const SocialAuth: React.FC<NavigationScreenProps> = ({ navigation }) => {
  const { data, loading } = useQuery<SocialConnectData>(GET_SOCIAL_LINKS)

  const navigateToSocialAuth = useCallback(({ url }: SocialButtonData) => {
    navigation.navigate(ROUTES.AUTH.SOCIAL_AUTH, { url })
  }, [])

  if (loading) {
    return <Loader />
  }

  if (!data) {
    return null
  }

  if (data && data.SocialConnectQuery) {
    return (
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
    )
  }

  return null
}

export default withNavigation(SocialAuth)
