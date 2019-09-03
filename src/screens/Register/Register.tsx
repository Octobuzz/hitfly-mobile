import React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import { View, SafeView } from 'src/components'
import { SocialAuth } from 'src/containers'
import RegisterForm from './RegisterFormContainer'
import styled from 'src/styled-components'

const IndentedSocialAuth = styled(SocialAuth)`
  margin-bottom: 24px;
`

// interface User {
//   token: string
// }

class Register extends React.Component<NavigationScreenProps> {
  render() {
    return (
      <SafeView>
        <View>
          <IndentedSocialAuth bottomText="или зарегистрируйтесь через почту" />
          <RegisterForm />
        </View>
      </SafeView>
    )
  }
}

export default Register
