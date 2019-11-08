import React from 'react'
import { View, HelperText, SafeView } from 'src/components'
import ForgotPasswordForm from './ForgotPasswordForm'

interface Props {
  onSubmit: (values: any) => Promise<any>
}

const ForgotPassword: React.FC<Props> = ({ onSubmit }) => (
  <SafeView>
    <View>
      <HelperText>
        Введите ваш e–mail и мы отправим вам письмо с инструкцией по
        восстановлению пароля
      </HelperText>
      <ForgotPasswordForm onSubmit={onSubmit} />
    </View>
  </SafeView>
)

export default ForgotPassword
