import React from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import {
  Link,
  View,
  Stretcher,
  NavigationList,
  NavigationItem,
} from 'src/components'

interface Props extends NavigationStackScreenProps {}

class Settings extends React.Component<Props> {
  private items: NavigationItem[] = [
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
    },
  ]

  render() {
    return (
      <View paddingTop={0} addBottomSafePadding>
        <NavigationList items={this.items} />
        <Stretcher />
        <Link title="Выйти" />
      </View>
    )
  }
}

export default Settings
