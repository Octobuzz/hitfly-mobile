import React, { ReactNode } from 'react'
import * as Yup from 'yup'
import { Field, Formik, FormikProps } from 'formik'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons'
import { Link, Input, Button } from 'src/components'
import { strings } from 'src/constants'
import styled from 'src/styled-components'

const IndentedInput = styled(Input).attrs(() => ({
  containerStyle: { marginBottom: 16 },
}))``

interface Values {
  email: string
  password: string
  passwordRepeat: string
}

interface Props {
  onSubmit: (from: Values) => void
}

class RegisterForm extends React.Component<Props> {
  private validationSchema = Yup.object().shape({
    email: Yup.string()
      .required(strings.validation.required)
      .email(strings.validation.wrongEmail),
    password: Yup.string().required(strings.validation.required),
    passwordRepeat: Yup.string().required(strings.validation.required),
  })

  private renderFields = ({ handleSubmit }: FormikProps<Values>): ReactNode => {
    return (
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
        <Field
          name="passwordRepeat"
          label="Повторите пароль"
          secureTextEntry
          component={IndentedInput}
          RightIcon={<SimpleLineIcon size={20} name="key" />}
        />
        <Button title="Зарегистрироваться" onPress={handleSubmit} />
      </>
    )
  }

  render() {
    const { onSubmit } = this.props
    return (
      <Formik
        onSubmit={onSubmit}
        initialValues={{
          email: '',
          password: '',
          passwordRepeat: '',
        }}
        validationSchema={this.validationSchema}
        render={this.renderFields}
      />
    )
  }
}

export default RegisterForm
