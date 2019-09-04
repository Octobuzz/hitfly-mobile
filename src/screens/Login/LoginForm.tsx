import React from 'react'
import { Field, FormikProps } from 'formik'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons'
import { Link, Input, Button } from 'src/components'
import styled from 'src/styled-components'

const IndentedLink = styled(Link)`
  margin-bottom: 32px;
`

const IndentedInput = styled(Input).attrs(() => ({
  containerStyle: { marginBottom: 16 },
}))``

interface LoginFormValues {
  email: string
  password: string
}

interface Props extends FormikProps<LoginFormValues> {
  onPressFogrotPassword?: () => void
}

const LoginForm: React.FC<Props> = ({
  isValid,
  handleSubmit,
  isSubmitting,
  onPressFogrotPassword,
  errors,
}) => (
  <>
    <Field
      name="email"
      label="E-mail"
      component={IndentedInput}
      keyboardType="email-address"
      RightIcon={<MaterialIcon size={20} name="mail-outline" />}
    />
    <Field
      name="password"
      label="Пароль"
      secureTextEntry
      component={IndentedInput}
      RightIcon={<SimpleLineIcon size={20} name="key" />}
    />
    <IndentedLink onPress={onPressFogrotPassword} title="Забыли пароль?" />
    <Button
      title="Войти"
      isDisabled={!isValid || isSubmitting}
      isLoading={isSubmitting}
      onPress={handleSubmit}
    />
  </>
)

export default LoginForm
