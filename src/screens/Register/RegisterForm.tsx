import L from 'lodash'
import React, { useRef, useCallback, useEffect } from 'react'
import * as Yup from 'yup'
import { Field, FormikProps, withFormik } from 'formik'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons'
import {
  Input,
  Button,
  Dropdown,
  TextBase,
  CheckBox,
  DatePicker,
} from 'src/components'
import { strings } from 'src/constants'
import { transformFormErrors } from 'src/helpers'
import styled from 'src/styled-components'

const indentAttrs = () => ({
  containerStyle: { marginBottom: 16 },
})

const IndentedInput = styled(Input).attrs(indentAttrs)``

const IndentedDatepicker = styled(DatePicker).attrs(indentAttrs)``

const IndentedDropdown = styled(Dropdown).attrs(indentAttrs)``

const IndetedButton = styled(Button)`
  margin-top: 16px;
`

const StyledCheckBox = styled(CheckBox)`
  align-self: center;
`

const CheckBoxText = styled(TextBase)`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textAlt};
`

const BrandText = styled(CheckBoxText)`
  color: ${({ theme }) => theme.colors.brandPink};
`

interface Values {
  email: string
  password: string
  birthday: string
  gender: 'M' | 'F'
}

interface OuterProps {
  onSubmit: (values: Values) => Promise<any>
  onPressPolicy: () => void
}

interface Props extends FormikProps<Values>, OuterProps {}

const RegisterForm: React.FC<Props> = ({
  isValid,
  handleSubmit,
  isSubmitting,
  validateForm,
  onPressPolicy,
}) => {
  // https://github.com/jaredpalmer/formik/issues/1950
  useEffect(() => {
    validateForm()
  }, [])

  const passwordRef = useRef()
  const repeatPasswordRef = useRef()
  const birhdayRef = useRef()

  const focusPasswordField = useCallback(() => {
    if (passwordRef.current) {
      // @ts-ignore
      passwordRef.current.focus()
    }
  }, [])

  const focusRepeatPasswordField = useCallback(() => {
    if (repeatPasswordRef.current) {
      // @ts-ignore
      repeatPasswordRef.current.focus()
    }
  }, [])

  const focusBirhdayRefField = useCallback(() => {
    if (birhdayRef.current) {
      // @ts-ignore
      birhdayRef.current.focus()
    }
  }, [])

  return (
    <>
      <Field
        name="email"
        label="E-mail"
        component={IndentedInput}
        returnKeyType="next"
        textContentType="emailAddress"
        enablesReturnKeyAutomatically
        onSubmitEditing={focusPasswordField}
        keyboardType="email-address"
        RightIcon={<MaterialIcon size={20} name="mail-outline" />}
      />
      <Field
        forwardRef={passwordRef}
        name="password"
        label="Пароль"
        textContentType="newPassword"
        blurOnSubmit={false} // https://github.com/facebook/react-native/issues/21911
        enablesReturnKeyAutomatically
        onSubmitEditing={focusRepeatPasswordField}
        returnKeyType="next"
        secureTextEntry
        component={IndentedInput}
        RightIcon={<SimpleLineIcon size={20} name="key" />}
      />
      <Field
        forwardRef={repeatPasswordRef}
        name="passwordRepeat"
        label="Повторите пароль"
        textContentType="none"
        secureTextEntry
        returnKeyType="next"
        enablesReturnKeyAutomatically
        onSubmitEditing={focusBirhdayRefField}
        component={IndentedInput}
        RightIcon={<SimpleLineIcon size={20} name="key" />}
      />
      <Field
        forwardRef={birhdayRef}
        name="birthday"
        label="Дата рождения"
        component={IndentedDatepicker}
        RightIcon={<MaterialIcon size={20} name="perm-contact-calendar" />}
      />
      <Field
        name="gender"
        label="Пол"
        options={[
          { value: 'M', title: 'Мужчина' },
          { value: 'F', title: 'Женщина' },
        ]}
        component={IndentedDropdown}
      />

      <Field name="policy" component={StyledCheckBox}>
        <CheckBoxText>
          Согласен с{' '}
          <BrandText onPress={onPressPolicy}>условиями использования</BrandText>
        </CheckBoxText>
      </Field>

      <IndetedButton
        isDisabled={!isValid || isSubmitting}
        isLoading={isSubmitting}
        title="Зарегистрироваться"
        onPress={handleSubmit}
      />
    </>
  )
}

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

export default withFormik<OuterProps, Values>({
  validationSchema,
  validateOnMount: true,
  handleSubmit: async (
    values,
    { props: { onSubmit }, setErrors, setSubmitting },
  ) => {
    try {
      await onSubmit(values)
    } catch (error) {
      const formErrors = transformFormErrors(error)
      setErrors(formErrors)
    } finally {
      setSubmitting(false)
    }
  },
  // @ts-ignore
  mapPropsToValues: L.constant({
    gender: 'M',
  }),
})(RegisterForm)
