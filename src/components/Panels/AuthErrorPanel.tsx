import React, { createRef } from 'react'
import { Animated } from 'react-native'
import SlidingPanel, { SlidingPanelInstance } from './SlidingPanel'
import TextBase from '../TextBase'
import { Button, Link } from '../buttons'
import { View } from '../views'
import { NavigationService, ROUTES } from 'src/navigation'
import styled from 'src/styled-components'

const LogoutText = styled(TextBase)`
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
`

const LogoutBoldText = styled(LogoutText)`
  font-family: ${({ theme }) => theme.fonts.bold};
`

const IndetedButton = styled(Button)`
  margin-top: 32px;
  margin-bottom: 24px;
`

class AuthErrorPanel extends React.Component<any> {
  private animatedValue = new Animated.Value(0)

  private panel = createRef<SlidingPanelInstance>()

  hidePanel = (): void => {
    if (this.panel.current) {
      this.panel.current.hide()
    }
  }

  showPanel = (): void => {
    if (this.panel.current) {
      this.panel.current.show()
    }
  }

  private navigateToLogin = () => {
    NavigationService.navigate({ routeName: ROUTES.APP.AUTH })
  }

  render() {
    return (
      <SlidingPanel animatedValue={this.animatedValue} forwardRef={this.panel}>
        <View paddingBottom={32} noFill>
          <LogoutText>
            Для выполнения следующего действия требуется{' '}
            <LogoutBoldText>Авторизация</LogoutBoldText>
          </LogoutText>
          <IndetedButton onPress={this.navigateToLogin} title="Войти" />
          <Link type="dark" title="Отмена" onPress={this.hidePanel} />
        </View>
      </SlidingPanel>
    )
  }
}

export default AuthErrorPanel
