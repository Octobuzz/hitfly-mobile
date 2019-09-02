import React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import { View, SafeView } from 'src/components'
import { SocialAuth } from 'src/containers'
import RegisterForm from './RegisterForm'
import { ROUTES } from 'src/navigation'
import styled from 'src/styled-components'

const IndentedSocialAuth = styled(SocialAuth)`
  margin-bottom: 24px;
`

class Register extends React.Component<NavigationScreenProps> {
  private handleSubmit = () => {
    const { navigation } = this.props
    navigation.navigate(ROUTES.AUTH.SELECT_GENRE)
  }

  render() {
    return (
      <SafeView>
        <View>
          <IndentedSocialAuth bottomText="или зарегистрируйтесь через почту" />
          <RegisterForm onSubmit={this.handleSubmit} />
        </View>
      </SafeView>
    )
  }
}

export default Register
