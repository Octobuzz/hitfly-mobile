import React from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { Button, SafeView, View, Stretcher } from 'src/components'
import { images, storageKeys, routes } from 'src/constants'
import Features, { Feature } from './Features'
import { storage, GET_SOCIAL_LINKS } from 'src/apollo'
import styled from 'src/styled-components'
import { graphql } from '@apollo/react-hoc'

const LogoWrapper = styled.TouchableWithoutFeedback.attrs(() => ({
  delayLongPress: 2000,
}))``

const Logo = styled.Image.attrs(() => ({
  source: images.WELCOME_LOGO,
  resizeMode: 'contain',
}))`
  flex: 20;
  max-height: 365px;
  margin-bottom: 12px;
  max-height: 365px;
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

  private navigateToEgg = (): void => {
    const { navigation } = this.props
    navigation.navigate(routes.APP.EASTER_EGG)
  }

  private navigateToNext = () => {
    const { navigation } = this.props
    storage.setItem(storageKeys.SKIP_WELCOME, true)
    navigation.navigate(routes.AUTH.LOGIN)
  }

  render() {
    return (
      <SafeView>
        <View paddingHorizontal={38}>
          <LogoWrapper onLongPress={this.navigateToEgg}>
            <Logo />
          </LogoWrapper>
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

export default graphql<NavigationStackScreenProps>(GET_SOCIAL_LINKS)(Welcome)
