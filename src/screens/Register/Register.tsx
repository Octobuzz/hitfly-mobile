import React from 'react'
import { View, SocialButton, TextWithLines } from 'src/components'
import { SocialAuth } from 'src/containers'
import RegisterForm from './RegisterForm'
import styled from 'src/styled-components'

const Container = styled.SafeAreaView`
  flex: 1;
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
          <SocialAuth />
          <IndentedTextWithLines>
            или зарегистрируйтесь через почту
          </IndentedTextWithLines>
          <RegisterForm onSubmit={this.handleSubmit} />
        </View>
      </Container>
    )
  }
}

export default Register
