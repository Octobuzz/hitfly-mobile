import React, { ReactNode } from 'react'
import * as Yup from 'yup'
import { Field, Formik, FormikProps } from 'formik'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons'
import {
  Input,
  Button,
  Dropdown,
  TextBase,
  CheckBox,
  DatePicker,
  FormWrapper,
} from 'src/components'
import { NavigationService } from 'src/navigation'
import { strings } from 'src/constants'
import styled from 'src/styled-components'

const indentAttrs = () => ({
  containerStyle: { marginBottom: 16 },
})

const IndentedInput = styled(Input).attrs(indentAttrs)``

const IndentedDatepicker = styled(DatePicker).attrs(indentAttrs)``

const IndentedDropdown = styled(Dropdown).attrs(indentAttrs)``

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
  passwordRepeat: string
  birthday: string
  gender: 'M' | 'F'
}

interface Props {
  onSubmit: (form: Values) => void
}

class RegisterForm extends React.Component<Props> {
  private validationSchema = Yup.object().shape({
    email: Yup.string()
      .required(strings.validation.required)
      .email(strings.validation.wrongEmail),
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

  private renderFields = ({
    handleSubmit,
    isValid,
  }: FormikProps<Values>): ReactNode => {
    return (
      <>
        <FormWrapper>
          <Field
            name="email"
            label="E-mail"
            component={IndentedInput}
            keyboardType="email-address"
            RightIcon={<MaterialIcon size={20} name="mail-outline" />}
          />
          <Field
            name="password"
            label="Пароль"
            secureTextEntry
            component={IndentedInput}
            RightIcon={<SimpleLineIcon size={20} name="key" />}
          />
          <Field
            name="passwordRepeat"
            label="Повторите пароль"
            secureTextEntry
            component={IndentedInput}
            RightIcon={<SimpleLineIcon size={20} name="key" />}
          />
          <Field
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
              <BrandText onPress={this.navigateToDocument}>
                условиями использования
              </BrandText>
            </CheckBoxText>
          </Field>
        </FormWrapper>
        <Button
          isDisabled={!isValid}
          title="Зарегистрироваться"
          onPress={handleSubmit}
        />
      </>
    )
  }

  // TODO: сделать когда бэк готов или хардкод?
  private navigateToDocument = (): void => {
    NavigationService.navigate({ routeName: '' })
  }

  render() {
    const { onSubmit } = this.props
    return (
      <Formik
        onSubmit={onSubmit}
        initialValues={{
          email: '',
          password: '',
          passwordRepeat: '',
          birthday: '',
          gender: 'M',
        }}
        validationSchema={this.validationSchema}
        render={this.renderFields}
      />
    )
  }
}

export default RegisterForm
