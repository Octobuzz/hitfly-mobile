import React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import { View, HelperText, SafeView } from 'src/components'
import ForgotPasswordForm from './ForgotPasswordFormContainer'

class ForgotPassword extends React.Component<NavigationScreenProps> {
  render() {
    return (
      <SafeView>
        <View>
          <HelperText>
            Введите ваш e–mail и мы отправим вам письмо с инструкцией по
            восстановлению пароля
          </HelperText>
          <ForgotPasswordForm />
        </View>
      </SafeView>
    )
  }
}

export default ForgotPassword
