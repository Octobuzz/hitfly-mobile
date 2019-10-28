import React from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { FormWrapper, SafeView } from 'src/components'
import { SocialAuth } from 'src/containers'
import RegisterForm from './RegisterFormContainer'
import styled from 'src/styled-components'

const IndentedSocialAuth = styled(SocialAuth)`
  margin-bottom: 24px;
`

class Register extends React.Component<NavigationStackScreenProps> {
  render() {
    return (
      <SafeView>
        <FormWrapper>
          <IndentedSocialAuth bottomText="или зарегистрируйтесь через почту" />
          <RegisterForm />
        </FormWrapper>
      </SafeView>
    )
  }
}

export default Register
