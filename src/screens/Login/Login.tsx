import React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import {
  View,
  Link,
  Button,
  TextBase,
  Stretcher,
  TextWithLines,
} from 'src/components'
import { SocialAuth } from 'src/containers'
import LoginForm from './LoginForm'
import { ROUTES } from 'src/navigation'
import styled from 'src/styled-components'

const Container = styled.SafeAreaView`
  flex: 1;
`

const IndentedTextWithLines = styled(TextWithLines)`
  margin-bottom: 24px;
`

const IndentedLink = styled(Link)`
  margin-bottom: 32px;
`

const IndentedButton = styled(Button)`
  margin-top: 24px;
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

class Login extends React.Component<NavigationScreenProps> {
  private handleSubmit = () => {}

  private navigateToRegistration = (): void => {
    const { navigation } = this.props
    navigation.navigate(ROUTES.AUTH.REGISTER)
  }

  private navigateToPasswordRecovery = (): void => {
    const { navigation } = this.props
    navigation.navigate(ROUTES.AUTH.FORGOT_PASSWORD)
  }

  render() {
    return (
      <Container>
        <View>
          <SocialAuth />
          <IndentedTextWithLines>или войдите через почту</IndentedTextWithLines>
          <LoginForm
            onPressFogrotPassword={this.navigateToPasswordRecovery}
            onSubmit={this.handleSubmit}
          />
          <IndentedButton
            onPress={this.navigateToRegistration}
            title="Зарегистрироваться"
            type="outline"
          />
          <Stretcher />
          <IndentedLink title="Пропустить" />
          <BottomText>
            Регистрируясь через эл.почту, Facebook, VK, Instagram или
            Одноклассники вы принимаете
          </BottomText>
          <BottomLinkText> Условия использования</BottomLinkText>
        </View>
      </Container>
    )
  }
}

export default Login
