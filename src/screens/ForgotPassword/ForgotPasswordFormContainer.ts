import L from 'lodash'
import * as Yup from 'yup'
import { withNavigation } from 'react-navigation'
import { withFormik } from 'formik'
import { withMutation } from '@apollo/react-hoc'
import { strings } from 'src/constants'
import ForgotPasswordForm from './ForgotPasswordForm'
import { ROUTES } from 'src/navigation'
import { transformFormErrors } from 'src/utils/helpers'
import gql from 'graphql-tag'

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required(strings.validation.required)
    .email(strings.validation.wrongEmail),
})

const RESET = gql`
  mutation Reset($email: String!) {
    resetPassword: resetPasswordMutation(email: $email)
  }
`

export default L.flowRight(
  withNavigation,
  withMutation(RESET),
  withFormik({
    validationSchema,
    handleSubmit: async ({ email }, { props, setErrors, setSubmitting }) => {
      // @ts-ignore
      const { mutate, navigation } = props
      try {
        await mutate({ variables: { email } })
        navigation.navigate(ROUTES.AUTH.RECOVERY_INFO, { email })
      } catch (error) {
        const formErrors = transformFormErrors(error)
        setErrors(formErrors)
      } finally {
        setSubmitting(false)
      }
    },
  }),
)(ForgotPasswordForm)
