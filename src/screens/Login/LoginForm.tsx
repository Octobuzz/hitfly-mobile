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

const IndentedInput = styled(Input)`
  margin-bottom: 16px;
`

interface Values {
  email: string
  password: string
}

interface Props {
  initialValues: Values
  onSubmit: (from: Values) => void
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

  private renderFields = ({ handleSubmit }: FormikProps<Values>): ReactNode => {
    return (
      <>
        <Field
          name="email"
          label="E-mail"
          component={IndentedInput}
          RightIcon={<MaterialIcon size={20} name="mail-outline" />}
        />
        <Field
          name="password"
          label="Пароль"
          secureTextEntry
          component={IndentedInput}
          RightIcon={<SimpleLineIcon size={20} name="key" />}
        />
        <IndentedLink title="Забыли пароль?" />
        <Button title="Войти" onPress={handleSubmit} />
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