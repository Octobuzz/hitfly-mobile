import React from 'react'
import { ViewStyle } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { TextBase } from 'src/components'
import styled from 'src/styled-components'

const Wrapper = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.8,
}))``

const Gradient = styled(LinearGradient).attrs(({ theme }) => ({
  colors: [theme.colors.brandBlue, theme.colors.brandPink],
}))`
  border-top-left-radius: 28px;
`

const Text = styled(props => <TextBase {...props} />)`
  text-align: center;
  padding-vertical: 24px;
  color: ${({ theme }) => theme.colors.white};
`

interface Props {
  onPress?: () => void
  style?: ViewStyle
}

const ShuffleButton: React.FC<Props> = ({ onPress, style }) => {
  return (
    <Wrapper style={style} onPress={onPress}>
      <Gradient>
        <Text>Перемешать</Text>
      </Gradient>
    </Wrapper>
  )
}

export default ShuffleButton
