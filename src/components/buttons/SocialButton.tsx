import React from 'react'
import { ViewStyle, StyleProp } from 'react-native'
import { images } from 'src/constants'
import styled from 'src/styled-components'

const Wrapper = styled.TouchableOpacity``

const Icon = styled.Image``

export type SocialButtonType = 'vk' | 'fb' | 'ok' | 'inst' | 'gg'

export interface SocialButtonData {
  type: SocialButtonType
  url: string
  isActive?: boolean
}

interface Props {
  data: SocialButtonData // TODO: назвать по-другому?
  style?: StyleProp<ViewStyle>
  onPress?: (buttonData: SocialButtonData) => void
}

class SocialButton extends React.Component<Props> {
  private getIconSource = (): number => {
    const {
      data: { type },
    } = this.props
    switch (type) {
      case 'vk':
        return images.SOCIAL_VKONTAKTE
      case 'fb':
        return images.SOCIAL_FACEBOOK
      case 'ok':
        return images.SOCIAL_ODNOKLASSNIKI
      case 'gg':
        return images.SOCIAL_GOOGLE
      case 'inst':
        return images.SOCIAL_INSTAGRAM
      default:
        return images.SOCIAL_FACEBOOK // TODO: ошибку или заглушку
    }
  }

  private handlePress = (): void => {
    const {
      data: { type },
      onPress,
    } = this.props
    if (onPress) {
      onPress(type)
    }
  }

  render() {
    const { style } = this.props
    const source = this.getIconSource()
    return (
      <Wrapper onPress={this.handlePress} style={style}>
        <Icon source={source} />
      </Wrapper>
    )
  }
}

export default SocialButton
