import L from 'lodash'
import * as Yup from 'yup'
import { withNavigation } from 'react-navigation'
import { withFormik } from 'formik'
import { withMutation } from '@apollo/react-hoc'
import { strings, storageKeys } from 'src/constants'
import RegisterForm from './RegisterForm'
import { ROUTES } from 'src/navigation'
import { transformFormErrors } from 'src/utils/helpers'
import { storage } from 'src/utils'
import gql from 'graphql-tag'

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required(strings.validation.required)
    .email(strings.validation.wrongEmail),
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
  birthday: Yup.string().required(strings.validation.required),
  gender: Yup.string()
    .required(strings.validation.required)
    .matches(/(M|F)/, strings.validation.wrongSelection),
  policy: Yup.boolean().required(strings.validation.required),
})

const REGISTER = gql`
  mutation Register(
    $email: String!
    $password: String!
    $birthday: String!
    $gender: GenderType!
  ) {
    register: registrationMutation(
      email: $email
      password: $password
      birthday: $birthday
      gender: $gender
    ) {
      token: accessToken
    }
  }
`

export default L.flowRight(
  withNavigation,
  withMutation(REGISTER),
  withFormik({
    validationSchema,
    handleSubmit: async (payload, { props, setErrors, setSubmitting }) => {
      // @ts-ignore
      const { mutate, navigation } = props
      try {
        const result = await mutate({ variables: payload })
        const token = L.get(result, 'data.register.token')
        if (token) {
          await storage.setItem(storageKeys.AUTH_TOKEN, token as string)
          // TODO: это костыль, удалить когда бэк станет лучше
          await storage.setItem(storageKeys.GRAPHQL_ENDPOINT, 'user')
          navigation.navigate(ROUTES.AUTH.SELECT_GENRE)
        }
      } catch (error) {
        const formErrors = transformFormErrors(error)
        setErrors(formErrors)
      } finally {
        setSubmitting(false)
      }
    },
    mapPropsToValues: L.constant({
      gender: 'M',
    }),
  }),
)(RegisterForm)
