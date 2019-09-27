import React from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { View, HelperText, SafeView } from 'src/components'
import ForgotPasswordForm from './ForgotPasswordFormContainer'

class ForgotPassword extends React.Component<NavigationStackScreenProps> {
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
