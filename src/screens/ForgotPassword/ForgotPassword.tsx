import React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import { View, HelperText, SafeView } from 'src/components'
import ForgotPasswordForm, { ForgotPasswordValues } from './ForgotPasswordForm'
import { ROUTES } from 'src/navigation'

class ForgotPassword extends React.Component<NavigationScreenProps> {
  private handleSubmit = ({ email }: ForgotPasswordValues): void => {
    const { navigation } = this.props
    navigation.navigate(ROUTES.AUTH.RECOVERY_INFO, { email })
  }

  render() {
    return (
      <SafeView>
        <View>
          <HelperText>
            Введите ваш e–mail и мы отправим вам письмо с инструкцией по
            восстановлению пароля
          </HelperText>
          <ForgotPasswordForm onSubmit={this.handleSubmit} />
        </View>
      </SafeView>
    )
  }
}

export default ForgotPassword
