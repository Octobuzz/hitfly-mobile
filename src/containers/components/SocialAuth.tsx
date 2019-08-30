import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { SocialButton } from 'src/components'
import styled from 'src/styled-components'

const SocialRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding-horizontal: 10px;
  margin-bottom: 32px;
`

const SocialAuth = () => {
  const { data, error, loading } = useQuery(gql`
    {
      SocialConnectQuery {
        social_type
        link
        connected
      }
    }
  `)
  return (
    <SocialRow>
      <SocialButton type="fb" />
      <SocialButton type="vk" />
      <SocialButton type="inst" />
      <SocialButton type="ok" />
    </SocialRow>
  )
}

export default SocialAuth
