import React from 'react'
import * as Yup from 'yup'
import { Field, FormikProps, withFormik } from 'formik'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { View, SafeView, Button, Stretcher, Input } from 'src/components'
import { ProfileSocialAuth } from 'src/containers/components'
import styled from 'src/styled-components'
import { transformFormErrors } from 'src/helpers'
import { strings } from 'src/constants'

const ChangePasswordButton = styled(Button)`
  margin-vertical: 24px;
`

interface Values {
  email: string
}

interface OuterProps extends NavigationStackScreenProps {
  email: string
  onPressChangePassword: () => void
  onSubmit: (values: Values) => Promise<any>
}

interface Props extends FormikProps<Values>, OuterProps {}

const AuthSettings: React.FC<Props> = ({
  isValid,
  handleSubmit,
  isSubmitting,
  onPressChangePassword,
}) => {
  return (
    <SafeView>
      <View>
        <Field
          name="email"
          label="E-mail"
          component={Input}
          returnKeyType="send"
          textContentType="emailAddress"
          autoCompleteType="email"
          keyboardType="email-address"
          onSubmitEditing={handleSubmit}
          RightIcon={<MaterialIcon size={20} name="mail-outline" />}
        />
        <ChangePasswordButton
          onPress={onPressChangePassword}
          type="outline"
          title="Изменить пароль"
        />
        <ProfileSocialAuth />
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
  email: Yup.string()
    .required(strings.validation.required)
    .email(strings.validation.wrongEmail),
})

export default withFormik<OuterProps, Values>({
  validationSchema,
  validateOnMount: true,
  mapPropsToValues: ({ email }) => ({ email }),
  handleSubmit: async (
    values,
    { props: { onSubmit, navigation, email }, setSubmitting, setErrors },
  ) => {
    try {
      if (values.email !== email) {
        await onSubmit(values)
      }
      navigation.goBack()
    } catch (error) {
      const formErrors = transformFormErrors(error)
      setErrors(formErrors)
    } finally {
      setSubmitting(false)
    }
  },
})(AuthSettings)
