import React from 'react'
import * as Yup from 'yup'
import { Field, FormikProps, withFormik } from 'formik'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { View, SafeView, Button, Stretcher, Input } from 'src/components'
// import { ProfileSocialAuth } from 'src/containers/components'
import styled from 'src/styled-components'
import { transformFormErrors } from 'src/helpers'
import { strings } from 'src/constants'

const ChangePasswordButton = styled(Button)`
  margin-vertical: 24px;
`

interface Values {
  userName: string
}

interface OuterProps extends NavigationStackScreenProps {
  userName: string
  onPressChangePassword: () => void
  onSubmit: (values: Values) => Promise<any>
}

interface Props extends FormikProps<Values>, OuterProps {}

const ProfileSettings: React.FC<Props> = ({
  isValid,
  handleSubmit,
  isSubmitting,
  onPressChangePassword,
}) => {
  return (
    <SafeView>
      <View>
        <Field
          name="userName"
          label="Имя"
          component={Input}
          returnKeyType="send"
          textContentType="username"
          keyboardType="email-address"
          onSubmitEditing={handleSubmit}
          RightIcon={<MaterialIcon size={20} name="mail-outline" />}
        />
        {/*<Field*/}
        {/*  name="city"*/}
        {/*  label="Город"*/}
        {/*  component={Input}*/}
        {/*  returnKeyType="send"*/}
        {/*  textContentType="addressCity"*/}
        {/*  keyboardType="email-address"*/}
        {/*  onSubmitEditing={handleSubmit}*/}
        {/*  RightIcon={<MaterialIcon size={20} name="mail-outline" />}*/}
        {/*/>*/}

        <Stretcher />
        <Button
          onPress={handleSubmit}
          // isDisabled={!isValid || isSubmitting}
          isLoading={isSubmitting}
          title="Сохранить изменения"
        />
      </View>
    </SafeView>
  )
}

const validationSchema = Yup.object().shape({
  userName: Yup.string()
    // .required(strings.validation.required)
    // .email(strings.validation.wrongEmail),
})

export default withFormik<OuterProps, Values>({
  validationSchema,
  validateOnMount: true,
  mapPropsToValues: ({ userName }) => ({ userName }),
  handleSubmit: async (
    values,
    { props: { onSubmit, navigation, email }, setSubmitting, setErrors },
  ) => {
    try {
      debugger;
      // if (values.userName !== userName) {
        await onSubmit(values)
      // }
      navigation.goBack()
    } catch (error) {
      const formErrors = transformFormErrors(error)
      setErrors(formErrors)
    } finally {
      setSubmitting(false)
    }
  },
})(ProfileSettings)
