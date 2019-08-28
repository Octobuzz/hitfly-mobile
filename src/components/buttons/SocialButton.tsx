import React from 'react'
import { images } from 'src/constants'
import styled from 'src/styled-components'

const Wrapper = styled.TouchableOpacity``

const Icon = styled.Image``

interface Props {
  type: 'vk' | 'fb' | 'ok' | 'inst' | 'gg'
  style?: any
  onPress?: () => void
}

class SocialButton extends React.Component<Props> {
  private getIconSource = (): number => {
    const { type } = this.props
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
    }
  }

  render() {
    const { onPress, style } = this.props
    const source = this.getIconSource()
    return (
      <Wrapper onPress={onPress} style={style}>
        <Icon source={source} />
      </Wrapper>
    )
  }
}

export default SocialButton
