import React from 'react'
import { ViewStyle, StyleProp } from 'react-native'
import { images } from 'src/constants'
import { SocialConnect } from 'src/apollo'
import { disabledStyle } from './Button'
import styled from 'src/styled-components'

const Wrapper = styled.TouchableOpacity`
  ${disabledStyle}
`

const Icon = styled.Image<Faded>`
  ${({ isFaded, theme }) =>
    isFaded && `tint-color: ${theme.colors.inputBorder};`}
`

interface Faded {
  isFaded?: boolean
}

interface Props {
  buttonData: SocialConnect
  useFading?: boolean
  style?: StyleProp<ViewStyle>
  onPress: (buttonData: SocialConnect) => void
}

class SocialButton extends React.Component<Props> {
  static defaultProps = {
    onPress: () => {},
  }

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
    onPress(buttonData)
  }

  render() {
    const {
      style,
      useFading,
      buttonData: { isLinked },
    } = this.props
    const source = this.getIconSource()
    return (
      <Wrapper onPress={this.handlePress} style={style}>
        <Icon isFaded={useFading && !isLinked} source={source} />
      </Wrapper>
    )
  }
}

export default SocialButton
