import React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import { ScrollView, Stretcher, Button, SafeView } from 'src/components'
import { images } from 'src/constants'
import styled from 'src/styled-components'
import { ROUTES } from 'src/navigation'
import Features, { Feature } from './Features'

const Logo = styled.Image.attrs(() => ({
  source: images.WELCOME_LOGO,
}))`
  margin-bottom: 12px;
  align-self: center;
`

class Welcome extends React.Component<NavigationScreenProps> {
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
    navigation.navigate(ROUTES.AUTH.LOGIN)
  }

  render() {
    return (
      <SafeView>
        <ScrollView>
          <Logo />
          <Features features={this.features} />
          <Stretcher />
          <Button
            onPress={this.navigateToNext}
            type="outline"
            title="Начать слушать музыку"
          />
        </ScrollView>
      </SafeView>
    )
  }
}

export default Welcome
