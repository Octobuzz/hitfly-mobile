import React from 'react'
import {
  View,
  TextBase,
  Stretcher,
  SocialButton,
  TextWithLines,
} from 'src/components'
import RegisterForm from './RegisterForm'
import styled from 'src/styled-components'

const Container = styled.SafeAreaView`
  flex: 1;
`

const SocialRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding-horizontal: 10px;
  margin-bottom: 32px;
`

const IndentedTextWithLines = styled(TextWithLines)`
  margin-bottom: 24px;
`

class Register extends React.Component {
  private handleSubmit = () => {}
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
          <IndentedTextWithLines>или войдите через почту</IndentedTextWithLines>
          <RegisterForm onSubmit={this.handleSubmit} />
        </View>
      </Container>
    )
  }
}

export default Register
