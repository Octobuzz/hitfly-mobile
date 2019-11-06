import React from 'react'
import * as Yup from 'yup'
import { Field, FormikProps, withFormik } from 'formik'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons'
import {
  View,
  Input,
  Button,
  SafeView,
  Stretcher,
  HelperText,
} from 'src/components'
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

interface OuterProps extends NavigationStackScreenProps {
  onSubmit: (values: Values) => Promise<any>
}

interface Props extends FormikProps<Values>, OuterProps {}

const ChangePassword: React.FC<Props> = ({
  isValid,
  handleSubmit,
  isSubmitting,
}) => {
  return (
    <SafeView>
      <View>
        <HelperText>Введите новый пароль</HelperText>
        <Field
          name="password"
          label="Пароль"
          secureTextEntry
          textContentType="newPassword"
          component={IndentedInput}
          RightIcon={<SimpleLineIcon size={20} name="key" />}
        />
        <Field
          name="passwordRepeat"
          label="Повторите пароль"
          secureTextEntry
          returnKeyType="send"
          textContentType="newPassword"
          onSubmitEditing={handleSubmit}
          component={IndentedInput}
          RightIcon={<SimpleLineIcon size={20} name="key" />}
        />
        <Stretcher />
        <Button
          onPress={handleSubmit}
          isDisabled={!isValid || isSubmitting}
          isLoading={isSubmitting}
          title="Сохранить изменения"
        />
      </View>
    </SafeView>
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
    { props: { onSubmit, navigation }, setSubmitting, setErrors },
  ) => {
    try {
      await onSubmit(values)
      navigation.goBack()
    } catch (error) {
      const formErrors = helpers.transformFormErrors(error)
      setErrors(formErrors)
    } finally {
      setSubmitting(false)
    }
  },
})(ChangePassword)
