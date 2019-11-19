import React, { createRef } from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { LogoutProps } from 'src/HOCs'
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

const LogoutText = styled(TextBase)`
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
    // закоменченный код пусть пока будет здесь
    // в первом релизе решили убрать эти экраны (или ссылки на веб)
    const items: NavigationItem[] = [
      // {
      //   title: 'Редактировать профиль',
      // },
      {
        title: 'Список любимых жанров',
        onPress: () => {
          navigation.navigate(ROUTES.MAIN.MY_GENRES)
        },
      },
      {
        title: 'Настройка входа',
        onPress: () => {
          navigation.navigate(ROUTES.MAIN.AUTH_SETTINGS)
        },
      },
      // {
      //   title: 'Удалить аккаунт',
      //   onPress: () => {
      //     navigation.navigate(ROUTES.MAIN.REMOVE_ACCOUNT)
      //   },
      // },
    ]
    return items
  }

  private logoutPanel = createRef<SlidingPanelInstance>()

  private showLogoutPanel = (): void => {
    if (this.logoutPanel.current) {
      this.logoutPanel.current.show()
    }
  }

  private hideLogoutPanel = (): void => {
    if (this.logoutPanel.current) {
      this.logoutPanel.current.hide()
    }
  }

  // TODO: Вынести панель в навигатор, как для DetailedTrackPanel
  render() {
    const { logout, isLoginingOut } = this.props
    return (
      <View paddingTop={0} addBottomSafePadding>
        <NavigationList items={this.items} />
        <Stretcher />
        <Link title="Выйти" onPress={this.showLogoutPanel} />
        <SlidingPanel forwardRef={this.logoutPanel}>
          <View paddingBottom={32} noFill>
            <LogoutText>Вы уверены, что хотите выйти из аккаута?</LogoutText>
            <IndetedButton
              isLoading={isLoginingOut}
              isDisabled={isLoginingOut}
              onPress={logout}
              title="Выйти"
            />
            <Link type="dark" title="Отмена" onPress={this.hideLogoutPanel} />
          </View>
        </SlidingPanel>
      </View>
    )
  }
}

export default Settings
