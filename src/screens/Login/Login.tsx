import React from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { Link, Button, TextBase, SafeView, FormWrapper } from 'src/components'
import { SocialAuth } from 'src/containers'
import LoginForm from './LoginForm'
import { ROUTES } from 'src/navigation'
import styled from 'src/styled-components'

const IndentedLink = styled(Link)`
  margin-bottom: 32px;
`

const IndentedButton = styled(Button)`
  margin-vertical: 24px;
`

const IndentedSocialAuth = styled(SocialAuth)`
  margin-bottom: 24px;
`

const BottomText = styled(TextBase)`
  color: ${({ theme }) => theme.colors.textGray};
  font-size: 12px;
  text-align: center;
  line-height: 20px;
`

const BottomLinkText = styled(BottomText)`
  color: ${({ theme }) => theme.colors.brandPink};
`

interface Props extends NavigationStackScreenProps {
  onSubmit: (values: any) => Promise<any>
}

class Login extends React.Component<Props> {
  private navigateToRegistration = (): void => {
    const { navigation } = this.props
    navigation.navigate(ROUTES.AUTH.REGISTER)
  }

  private navigateToPasswordRecovery = (): void => {
    const { navigation } = this.props
    navigation.navigate(ROUTES.AUTH.FORGOT_PASSWORD)
  }

  private navigateToMain = (): void => {
    const { navigation } = this.props
    navigation.navigate(ROUTES.MAIN.HOME)
  }

  render() {
    const { onSubmit } = this.props
    return (
      <SafeView>
        <FormWrapper>
          <IndentedSocialAuth bottomText="или войдите через почту" />
          <LoginForm
            onSubmit={onSubmit}
            onPressFogrotPassword={this.navigateToPasswordRecovery}
          />
          <IndentedButton
            onPress={this.navigateToRegistration}
            title="Зарегистрироваться"
            type="outline"
          />
          <IndentedLink onPress={this.navigateToMain} title="Пропустить" />
          <BottomText>
            Регистрируясь через эл.почту, Facebook, VK{/* , Instagram */} или
            Одноклассники вы принимаете
          </BottomText>
          <BottomLinkText> Условия использования</BottomLinkText>
        </FormWrapper>
      </SafeView>
    )
  }
}

export default Login
