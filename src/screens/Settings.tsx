import React, { createRef } from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { LogoutProps } from 'src/containers/HOCs'
import {
  Link,
  View,
  Button,
  TextBase,
  Stretcher,
  SlidingPanel,
  NavigationList,
  NavigationItem,
  SlidingPanelInstance,
} from 'src/components'
import styled from 'src/styled-components'
import { ROUTES } from 'src/navigation'

const LogoutText = styled(props => <TextBase {...props} />)`
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
`

const IndetedButton = styled(Button)`
  margin-top: 32px;
  margin-bottom: 24px;
`

interface Props extends NavigationStackScreenProps, LogoutProps {}

class Settings extends React.Component<Props> {
  private items: NavigationItem[]

  constructor(props: Props) {
    super(props)
    this.items = this.initItems()
  }

  private initItems = (): NavigationItem[] => {
    const { navigation } = this.props
    const items: NavigationItem[] = [
      {
        title: 'Редактировать профиль',
      },
      {
        title: 'Список любимых жанров',
      },
      {
        title: 'Настройка входа',
      },
      {
        title: 'Удалить аккаунт',
        onPress: () => {
          navigation.navigate(ROUTES.MAIN.REMOVE_ACCOUNT)
        },
      },
    ]
    return items
  }

  private logoutPanel = createRef<SlidingPanelInstance>()

  private showLogoutPanel = (): void => {
    if (this.logoutPanel && this.logoutPanel.current) {
      this.logoutPanel.current.show()
    }
  }

  private hideLogoutPanel = (): void => {
    if (this.logoutPanel && this.logoutPanel.current) {
      this.logoutPanel.current.hide()
    }
  }

  render() {
    const { logout } = this.props
    return (
      <View paddingTop={0} addBottomSafePadding>
        <NavigationList items={this.items} />
        <Stretcher />
        <Link title="Выйти" onPress={this.showLogoutPanel} />
        <SlidingPanel forwardRef={this.logoutPanel}>
          <View paddingBottom={32} noFill>
            <LogoutText>Вы уверены, что хотите выйти из аккаута?</LogoutText>
            <IndetedButton onPress={logout} title="Выйти" />
            <Link type="dark" title="Отмена" onPress={this.hideLogoutPanel} />
          </View>
        </SlidingPanel>
      </View>
    )
  }
}

export default Settings
