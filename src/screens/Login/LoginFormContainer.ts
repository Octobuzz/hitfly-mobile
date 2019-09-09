import L from 'lodash'
import * as Yup from 'yup'
import { withNavigation } from 'react-navigation'
import { withFormik } from 'formik'
import { withMutation } from '@apollo/react-hoc'
import { strings, storageKeys } from 'src/constants'
import LoginForm from './LoginForm'
import { ROUTES } from 'src/navigation'
import { transformFormErrors } from 'src/utils/helpers'
import { storage } from 'src/utils'
import gql from 'graphql-tag'

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required(strings.validation.required)
    .email(strings.validation.wrongEmail),
  password: Yup.string().required(strings.validation.required),
})

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login: loginMutation(email: $email, password: $password) {
      token: accessToken
    }
  }
`

export default L.flowRight(
  withNavigation,
  withMutation(LOGIN),
  withFormik({
    validationSchema,
    handleSubmit: async (payload, { props, setErrors, setSubmitting }) => {
      // @ts-ignore
      const { mutate, navigation } = props
      try {
        // TODO: это костыль, удалить когда бэк станет лучше
        await storage.setItem(storageKeys.GRAPHQL_ENDPOINT, 'auth')
        const result = await mutate({ variables: payload })
        const token = L.get(result, 'data.login.token')
        if (token) {
          await storage.setItem(storageKeys.AUTH_TOKEN, token as string)
          // TODO: это костыль, удалить когда бэк станет лучше
          await storage.setItem(storageKeys.GRAPHQL_ENDPOINT, 'user')
          navigation.navigate(ROUTES.MAIN.HOME)
        } else {
          // TODO: это костыль, удалить когда бэк станет лучше
          await storage.removeItem(storageKeys.GRAPHQL_ENDPOINT)
        }
      } catch (error) {
        const formErrors = transformFormErrors(error)
        setErrors(formErrors)
        // TODO: это костыль, удалить когда бэк станет лучше
        await storage.removeItem(storageKeys.GRAPHQL_ENDPOINT)
      } finally {
        setSubmitting(false)
      }
    },
  }),
)(LoginForm)
