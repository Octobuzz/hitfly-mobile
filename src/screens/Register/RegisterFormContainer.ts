import R from 'ramda'
import * as Yup from 'yup'
import { withNavigation } from 'react-navigation'
import { withFormik } from 'formik'
import { withMutation } from '@apollo/react-hoc'
import { strings } from 'src/constants'
import RegisterForm from './RegisterForm'
import gql from 'graphql-tag'
import { ROUTES } from 'src/navigation'
import { transformFormErrors } from 'src/utils/helpers'

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required(strings.validation.required)
    .email(strings.validation.wrongEmail),
  // TODO: добавить валидацию на формат пароля
  password: Yup.string().required(strings.validation.required),
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

export default R.compose(
  withNavigation,
  withMutation(REGISTER),
  withFormik({
    validationSchema,
    handleSubmit: async (payload, { props, setErrors, setSubmitting }) => {
      const { mutate, navigation } = props
      try {
        await mutate({ variables: payload })
        navigation.navigate(ROUTES.AUTH.SELECT_GENRE)
      } catch (error) {
        const formErrors = transformFormErrors(error)
        setErrors(formErrors)
      } finally {
        setSubmitting(false)
      }
    },
    mapPropsToValues: R.always({
      gender: 'M',
    }),
  }),
  // @ts-ignore
)(RegisterForm)
