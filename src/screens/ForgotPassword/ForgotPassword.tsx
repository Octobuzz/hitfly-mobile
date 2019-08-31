import React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import { View, HelperText } from 'src/components'
import ForgotPasswordForm from './ForgotPasswordForm'
import { ROUTES } from 'src/navigation'
import styled from 'src/styled-components'

const Container = styled.SafeAreaView`
  flex: 1;
`

class ForgotPassword extends React.Component<NavigationScreenProps> {
  private handleSubmit = (): void => {
    const { navigation } = this.props
    navigation.navigate(ROUTES.AUTH.LOGIN)
  }

  render() {
    return (
      <Container>
        <View>
          <HelperText>
            Введите ваш e–mail и мы отправим вам письмо с инструкцией по
            восстановлению пароля
          </HelperText>
          <ForgotPasswordForm onSubmit={this.handleSubmit} />
        </View>
      </Container>
    )
  }
}

export default ForgotPassword
