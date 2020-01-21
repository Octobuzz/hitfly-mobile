import React from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import {
  Link,
  View,
  Stretcher,
  NavigationList,
  NavigationItem,
} from 'src/components'
import { routes } from 'src/constants'

interface Props extends NavigationStackScreenProps {
  onPressLogout: () => void
}

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
          navigation.navigate(routes.PROFILE.MY_GENRES)
        },
      },
      {
        title: 'Настройка входа',
        onPress: () => {
          navigation.navigate(routes.PROFILE.AUTH_SETTINGS)
        },
      },
      // {
      //   title: 'Удалить аккаунт',
      //   onPress: () => {
      //     navigation.navigate(routes.MAIN.REMOVE_ACCOUNT)
      //   },
      // },
    ]
    return items
  }

  render() {
    const { onPressLogout } = this.props
    return (
      <View paddingTop={0}>
        <NavigationList items={this.items} />
        <Stretcher />
        <Link title="Выйти" onPress={onPressLogout} />
      </View>
    )
  }
}

export default Settings
