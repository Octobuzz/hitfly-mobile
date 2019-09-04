import React from 'react'
import { Field, FormikProps } from 'formik'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { Input, Button, Stretcher } from 'src/components'

export interface ForgotPasswordFormValues {
  email: string
}

interface Props extends FormikProps<ForgotPasswordFormValues> {}

const ForgotPasswordForm: React.FC<Props> = ({
  isValid,
  handleSubmit,
  isSubmitting,
}) => (
  <>
    <Field
      name="email"
      label="E-mail"
      component={Input}
      keyboardType="email-address"
      RightIcon={<MaterialIcon size={20} name="mail-outline" />}
    />
    <Stretcher />
    <Button
      isDisabled={!isValid || isSubmitting}
      isLoading={isSubmitting}
      onPress={handleSubmit}
      title="Сбросить пароль"
    />
  </>
)

export default ForgotPasswordForm
