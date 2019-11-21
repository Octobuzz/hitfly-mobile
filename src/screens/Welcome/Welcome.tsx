import React from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { Button, SafeView, View, Stretcher } from 'src/components'
import { images, storageKeys, routes } from 'src/constants'
import Features, { Feature } from './Features'
import { storage } from 'src/utils'
import styled from 'src/styled-components'

const Logo = styled.Image.attrs(() => ({
  source: images.WELCOME_LOGO,
  resizeMode: 'contain',
}))`
  flex: 20;
  max-height: 365px;
  margin-bottom: 12px;
  align-self: center;
`

class Welcome extends React.Component<NavigationStackScreenProps> {
  features: Feature[] = [
    {
      icon: images.HEADPHONES_GRADIENT,
      title: 'Открывайте новых исполнителей',
    },
    {
      icon: images.GROWTH_GRADIENT,
      title: 'Выбирайте лучших',
    },
    {
      icon: images.INSIGNIA_GRADIENT,
      title: 'Отслеживайте популярность',
    },
    {
      icon: images.COINS_GRADIENT,
      title: 'Копите и обменивайте баллы',
    },
  ]

  private navigateToNext = () => {
    const { navigation } = this.props
    storage.setItem(storageKeys.SKIP_WELCOME, true)
    navigation.navigate(routes.AUTH.LOGIN)
  }

  render() {
    return (
      <SafeView>
        <View paddingHorizontal={38}>
          <Logo />
          <Features features={this.features} />
          <Stretcher />
          <Button
            onPress={this.navigateToNext}
            type="outline"
            title="Начать слушать музыку"
          />
        </View>
      </SafeView>
    )
  }
}

export default Welcome
