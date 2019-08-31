import React, { ReactNode } from 'react'
import * as Yup from 'yup'
import { Field, Formik, FormikProps } from 'formik'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { Input, Button, Stretcher } from 'src/components'
import { strings } from 'src/constants'

interface Values {
  email: string
}

interface Props {
  initialValues: Values
  onSubmit: (from: Values) => void
}

class ForgotPasswordForm extends React.Component<Props> {
  static defaultProps = {
    initialValues: {},
  }

  private validationSchema = Yup.object().shape({
    email: Yup.string()
      .required(strings.validation.required)
      .email(strings.validation.wrongEmail),
  })

  private renderFields = ({ handleSubmit }: FormikProps<Values>): ReactNode => (
    <>
      <Field
        name="email"
        label="E-mail"
        component={Input}
        keyboardType="email-address"
        RightIcon={<MaterialIcon size={20} name="mail-outline" />}
      />
      <Stretcher />
      <Button onPress={handleSubmit} title="Сбросить пароль" />
    </>
  )

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

export default ForgotPasswordForm
