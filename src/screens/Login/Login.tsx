import React from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import {
  Link,
  Button,
  TextBase,
  SafeView,
  Stretcher,
  ScrollView,
} from 'src/components'
import { SocialAuth } from 'src/containers'
import LoginForm from './LoginFormContainer'
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

const BottomText = styled(props => <TextBase {...props} />)`
  color: ${({ theme }) => theme.colors.textGray};
  font-size: 12px;
  text-align: center;
  line-height: 20px;
`

const BottomLinkText = styled(BottomText)`
  color: ${({ theme }) => theme.colors.brandPink};
`

class Login extends React.Component<NavigationStackScreenProps> {
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
    return (
      <SafeView>
        <ScrollView>
          <IndentedSocialAuth bottomText="или войдите через почту" />
          <LoginForm onPressFogrotPassword={this.navigateToPasswordRecovery} />
          <IndentedButton
            onPress={this.navigateToRegistration}
            title="Зарегистрироваться"
            type="outline"
          />
          <Stretcher />
          <IndentedLink onPress={this.navigateToMain} title="Пропустить" />
          <BottomText>
            Регистрируясь через эл.почту, Facebook, VK, Instagram или
            Одноклассники вы принимаете
          </BottomText>
          <BottomLinkText> Условия использования</BottomLinkText>
        </ScrollView>
      </SafeView>
    )
  }
}

export default Login
