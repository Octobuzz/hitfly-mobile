import React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import { View, Stretcher, Button, SocialButton, Link } from 'src/components'
import styled from 'src/styled-components'

const Container = styled.SafeAreaView`
  flex: 1;
`

const SocialRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding-horizontal: 10px;
`

interface Props extends NavigationScreenProps {}

class Login extends React.Component<Props> {
  render() {
    return (
      <Container>
        <View>
          <SocialRow>
            <SocialButton type="fb" />
            <SocialButton type="vk" />
            <SocialButton type="inst" />
            <SocialButton type="ok" />
          </SocialRow>
        </View>
      </Container>
    )
  }
}

export default Login
