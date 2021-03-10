import React from 'react'
import * as Yup from 'yup'
import { Field, FormikProps, withFormik } from 'formik'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import ImagePicker from './ImagePicker'

const indentAttrs = () => ({
  containerStyle: { marginBottom: 16 },
})

const IndentedDropdown = styled(Dropdown).attrs(indentAttrs)``

import {
  Dropdown,
  View,
  SafeView,
  Button,
  Stretcher,
  Input,
} from 'src/components'
import styled from 'src/styled-components'
import { transformFormErrors } from 'src/helpers'

const ChangePasswordButton = styled(Button)`
  margin-vertical: 24px;
`

interface Values {
  userName: string
  cities: any
  city: any
}

interface OuterProps extends NavigationStackScreenProps {
  userName: string
  cities: any
  city: any

  onSubmit: (values: Values) => Promise<any>
}

interface Props extends FormikProps<Values>, OuterProps {}

const ProfileSettings: React.FC<Props> = ({
  isValid,
  handleSubmit,
  isSubmitting,
  cities,
  city,
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
        <Field
          component={IndentedDropdown}
          name="city"
          label="Город"
          options={cities}
          onSubmitEditing={handleSubmit}
          RightIcon={<MaterialIcon size={20} name="location-city" />}
        />

        {/*<ImagePicker />*/}

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
  userName: Yup.string(),
  // .required(strings.validation.required)
  // .email(strings.validation.wrongEmail),
  cities: Yup.array(),
  city: Yup.string(),
})

export default withFormik<OuterProps, Values>({
  validationSchema,
  validateOnMount: true,
  mapPropsToValues: ({ userName, cities, city }) => ({
    userName,
    cities,
    city,
  }),
  handleSubmit: async (
    values,
    {
      props: { onSubmit, navigation, email, userName, city },
      setSubmitting,
      setErrors,
    },
  ) => {
    try {
      console.log('values', values)
      if (values.userName !== userName && values.city !== city) {
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
})(ProfileSettings)
