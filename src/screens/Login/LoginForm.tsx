import L from 'lodash'
import React from 'react'
import * as Yup from 'yup'
import { Field, FormikProps, withFormik } from 'formik'
import { strings, storageKeys } from 'src/constants'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons'
import { Link, Input, Button } from 'src/components'
import styled from 'src/styled-components'
import { transformFormErrors } from 'src/utils/helpers'

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

interface OuterProps {
  onPressFogrotPassword?: () => void
  onSubmit: (values: Values) => Promise<any>
}

interface Props extends FormikProps<Values>, OuterProps {}

const LoginForm: React.FC<Props> = ({
  isValid,
  handleSubmit,
  isSubmitting,
  onPressFogrotPassword,
}) => (
  <>
    <Field
      name="email"
      label="E-mail"
      component={IndentedInput}
      textContentType="emailAddress"
      keyboardType="email-address"
      RightIcon={<MaterialIcon size={20} name="mail-outline" />}
    />
    <Field
      name="password"
      label="Пароль"
      textContentType="password"
      enablesReturnKeyAutomatically
      secureTextEntry
      component={IndentedInput}
      returnKeyType="send"
      onSubmitEditing={handleSubmit}
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

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required(strings.validation.required)
    .email(strings.validation.wrongEmail),
  password: Yup.string().required(strings.validation.required),
})

export default withFormik<OuterProps, Values>({
  validationSchema,
  handleSubmit: async (
    payload,
    { props: { onSubmit }, setErrors, setSubmitting },
  ) => {
    try {
      await onSubmit(payload)
    } catch (error) {
      const formErrors = transformFormErrors(error)
      setErrors(formErrors)
    } finally {
      setSubmitting(false)
    }
  },
})(LoginForm)
