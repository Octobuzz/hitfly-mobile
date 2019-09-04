import React from 'react'
import { ViewStyle, StyleProp } from 'react-native'
import { images } from 'src/constants'
import { SocialConnect } from 'src/apollo'
import { disabledStyle } from './Button'
import styled from 'src/styled-components'

const Wrapper = styled.TouchableOpacity`
  ${disabledStyle}
`

const Icon = styled.Image``

interface Props {
  buttonData: SocialConnect
  style?: StyleProp<ViewStyle>
  onPress?: (buttonData: SocialConnect) => void
}

class SocialButton extends React.Component<Props> {
  private getIconSource = (): number => {
    const {
      buttonData: { type },
    } = this.props
    switch (type) {
      case 'vkontakte':
        return images.SOCIAL_VKONTAKTE
      case 'facebook':
        return images.SOCIAL_FACEBOOK
      case 'odnoklassniki':
        return images.SOCIAL_ODNOKLASSNIKI
      case 'instagram':
        return images.SOCIAL_INSTAGRAM
      default:
        return images.SOCIAL_FACEBOOK // TODO: ошибку или заглушку
    }
  }

  private handlePress = (): void => {
    const { buttonData, onPress } = this.props
    if (onPress) {
      onPress(buttonData)
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
