import React, { useRef, useCallback } from 'react'
import * as Yup from 'yup'
import { Field, FormikProps, withFormik } from 'formik'
import { strings } from 'src/constants'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons'
import { /* Link, */ Input, Button } from 'src/components'
import { helpers } from 'src/utils'
import styled from 'src/styled-components'

// смотри коммент в месте использования
// const IndentedLink = styled(Link)`
//   margin-bottom: 32px;
// `

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
}) => {
  const passwordRef = useRef()
  const focusPasswordField = useCallback(() => {
    if (passwordRef && passwordRef.current) {
      // @ts-ignore
      passwordRef.current.focus()
    }
  }, [passwordRef])

  return (
    <>
      <Field
        name="email"
        label="E-mail"
        component={IndentedInput}
        onSubmitEditing={focusPasswordField}
        enablesReturnKeyAutomatically
        returnKeyType="next"
        textContentType="emailAddress"
        keyboardType="email-address"
        RightIcon={<MaterialIcon size={20} name="mail-outline" />}
      />
      <Field
        name="password"
        label="Пароль"
        forwardRef={passwordRef}
        textContentType="password"
        enablesReturnKeyAutomatically
        secureTextEntry
        component={IndentedInput}
        returnKeyType="send"
        onSubmitEditing={handleSubmit}
        RightIcon={<SimpleLineIcon size={20} name="key" />}
      />
      {/* временно в коменте, пока не решим что делать дальше. экран остается на месте */}
      {/* <IndentedLink onPress={onPressFogrotPassword} title="Забыли пароль?" /> */}
      <Button
        title="Войти"
        isDisabled={!isValid || isSubmitting}
        isLoading={isSubmitting}
        onPress={handleSubmit}
      />
    </>
  )
}

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
      const formErrors = helpers.transformFormErrors(error)
      setErrors(formErrors)
    } finally {
      setSubmitting(false)
    }
  },
})(LoginForm)
