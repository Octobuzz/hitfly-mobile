import React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import {
  View,
  Link,
  Button,
  TextBase,
  Stretcher,
  SocialButton,
  TextWithLines,
} from 'src/components'
import styled from 'src/styled-components'

const Container = styled.SafeAreaView`
  flex: 1;
`

const SocialRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding-horizontal: 10px;
  margin-bottom: 32px;
`

const IndentedTextWithLines = styled(TextWithLines)`
  margin-bottom: 24px;
`

const IndentedLink = styled(Link)`
  margin-bottom: 32px;
`

const IndentedButton = styled(Button)`
  margin-bottom: 24px;
`

const BottomText = styled(TextBase)`
  color: ${({ theme }) => theme.colors.textGray};
  font-size: 12px;
  text-align: center;
`

const BottomLinkText = styled(BottomText)`
  color: ${({ theme }) => theme.colors.brandPink};
`

interface Props extends NavigationScreenProps {}

class Login extends React.Component<Props> {
  render() {
    return (
      <Container>
        <View>
          <SocialRow>
            <SocialButton type="fb" />
            <SocialButton type="vk" />
            <SocialButton type="inst" />
            <SocialButton type="ok" />
          </SocialRow>
          <IndentedTextWithLines>или войдите через почту</IndentedTextWithLines>
          <IndentedLink title="Забыли пароль?" />
          <IndentedButton title="Войти" />
          <Button title="Зарегистрироваться" type="outline" />
          <Stretcher />
          <IndentedLink title="Пропустить" />
          <BottomText>
            Регистрируясь через эл.почту, Facebook, VK, Instagram или
            Одноклассники вы принимаете
            <BottomLinkText> Условия использования</BottomLinkText>
          </BottomText>
        </View>
      </Container>
    )
  }
}

export default Login
