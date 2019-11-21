import React from 'react'
import * as Yup from 'yup'
import { Field, FormikProps, withFormik } from 'formik'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { Input, Button, Stretcher } from 'src/components'
import { strings } from 'src/constants'
import { transformFormErrors } from 'src/helpers'

interface Values {
  email: string
}

interface OuterProps {
  onSubmit: (values: Values) => Promise<any>
}

interface Props extends FormikProps<Values>, OuterProps {}

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
      returnKeyType="send"
      textContentType="emailAddress"
      enablesReturnKeyAutomatically
      onSubmitEditing={handleSubmit}
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

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required(strings.validation.required)
    .email(strings.validation.wrongEmail),
})

export default withFormik<OuterProps, Values>({
  validationSchema,
  handleSubmit: async (
    values,
    { props: { onSubmit }, setErrors, setSubmitting },
  ) => {
    try {
      await onSubmit(values)
    } catch (error) {
      const formErrors = transformFormErrors(error)
      setErrors(formErrors)
    } finally {
      setSubmitting(false)
    }
  },
})(ForgotPasswordForm)
