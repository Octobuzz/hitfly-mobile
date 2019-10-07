import React from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { NavigationList, NavigationItem, View } from 'src/components'

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
      </View>
    )
  }
}

export default Settings
