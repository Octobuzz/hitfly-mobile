import R from 'ramda'
import * as Yup from 'yup'
import { withNavigation, NavigationInjectedProps } from 'react-navigation'
import { withFormik, FormikBag } from 'formik'
import { withMutation, MutateProps } from '@apollo/react-hoc'
import { strings } from 'src/constants'
import RegisterForm, { RegisterFormValues } from './RegisterForm'
import gql from 'graphql-tag'
import { ROUTES } from 'src/navigation'
import { transformFormErrors } from 'src/utils/helpers'

const handleSubmit = async (
  payload: RegisterFormValues,
  {
    props,
    setErrors,
    setSubmitting,
  }: FormikBag<MutateProps & NavigationInjectedProps, RegisterFormValues>,
) => {
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
}

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

export default R.pipe(
  withNavigation,
  withMutation(REGISTER),
  withFormik({
    validationSchema,
    handleSubmit,
    // @ts-ignore
    mapPropsToValues: (_: any) => ({
      gender: 'M',
      // FIXME: 'ниже тестовые - удалить'
      email: 'm@m.ru',
      password: '12345',
      passwordRepeat: '12345',
      birthday: '03.09.2000',
    }),
  }),
  // тут странная х.афпя происходит
  // @ts-ignore
)(RegisterForm)
