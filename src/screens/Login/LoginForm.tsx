import React, { ReactNode } from 'react'
import * as Yup from 'yup'
import { Field, Formik, FormikProps } from 'formik'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons'
import { Link, Input, Button } from 'src/components'
import { strings } from 'src/constants'
import styled from 'src/styled-components'

const IndentedLink = styled(Link)`
  margin-bottom: 32px;
`

const IndentedInput = styled(Input).attrs(() => ({
  containerStyle: { marginBottom: 16 },
}))``

interface Values {
  email: string
  password: string
}

interface Props {
  initialValues: Values
  onSubmit: (from: Values) => void
  onPressFogrotPassword?: () => void
}

class LoginForm extends React.Component<Props> {
  static defaultProps = {
    initialValues: {},
  }

  private validationSchema = Yup.object().shape({
    email: Yup.string()
      .required(strings.validation.required)
      .email(strings.validation.wrongEmail),
    password: Yup.string().required(strings.validation.required),
  })

  private renderFields = ({
    isValid,
    handleSubmit,
  }: FormikProps<Values>): ReactNode => {
    const { onPressFogrotPassword } = this.props
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
        <IndentedLink onPress={onPressFogrotPassword} title="Забыли пароль?" />
        <Button isDisabled={!isValid} title="Войти" onPress={handleSubmit} />
      </>
    )
  }

  render() {
    const { initialValues, onSubmit } = this.props
    return (
      <Formik
        onSubmit={onSubmit}
        validationSchema={this.validationSchema}
        initialValues={initialValues}
        render={this.renderFields}
      />
    )
  }
}

export default LoginForm
