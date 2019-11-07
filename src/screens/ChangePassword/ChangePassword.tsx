import React, { useRef, useCallback } from 'react'
import * as Yup from 'yup'
import { Field, FormikProps, withFormik } from 'formik'
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons'
import { View, Input, Button, HelperText, FormWrapper } from 'src/components'
import { helpers } from 'src/utils'
import { strings } from 'src/constants'
import styled from 'src/styled-components'

const IndentedInput = styled(Input).attrs(() => ({
  containerStyle: { marginBottom: 16 },
}))``

interface Values {
  password: string
  passwordRepeat: string
}

interface OuterProps {
  onSubmit: (values: Values) => Promise<any>
}

interface Props extends FormikProps<Values>, OuterProps {}

const ChangePassword: React.FC<Props> = ({
  isValid,
  handleSubmit,
  isSubmitting,
}) => {
  const repeatPasswordRef = useRef()

  const focusRepeatPasswordField = useCallback(() => {
    if (repeatPasswordRef.current) {
      // @ts-ignore
      repeatPasswordRef.current.focus()
    }
  }, [])

  return (
    <>
      <FormWrapper>
        <HelperText>Введите новый пароль</HelperText>
        <Field
          name="password"
          label="Пароль"
          secureTextEntry
          textContentType="newPassword"
          returnKeyType="next"
          onSubmitEditing={focusRepeatPasswordField}
          blurOnSubmit={false} // https://github.com/facebook/react-native/issues/21911
          component={IndentedInput}
          RightIcon={<SimpleLineIcon size={20} name="key" />}
        />
        <Field
          forwardRef={repeatPasswordRef}
          name="passwordRepeat"
          label="Повторите пароль"
          secureTextEntry
          returnKeyType="send"
          textContentType="newPassword"
          onSubmitEditing={handleSubmit}
          component={IndentedInput}
          RightIcon={<SimpleLineIcon size={20} name="key" />}
        />
      </FormWrapper>
      <View noFill addBottomSafePadding>
        <Button
          onPress={handleSubmit}
          isDisabled={!isValid || isSubmitting}
          isLoading={isSubmitting}
          title="Сохранить изменения"
        />
      </View>
    </>
  )
}

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required(strings.validation.required)
    .matches(
      /(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])/,
      strings.validation.passwordFormat,
    ),
  passwordRepeat: Yup.string().oneOf(
    [Yup.ref('password'), null],
    strings.validation.passwordsDontMatch,
  ),
})

export default withFormik<OuterProps, Values>({
  validationSchema,
  validateOnMount: true,
  handleSubmit: async (
    values,
    { props: { onSubmit }, setSubmitting, setErrors },
  ) => {
    try {
      await onSubmit(values)
    } catch (error) {
      const formErrors = helpers.transformFormErrors(error)
      setErrors(formErrors)
    } finally {
      setSubmitting(false)
    }
  },
})(ChangePassword)
