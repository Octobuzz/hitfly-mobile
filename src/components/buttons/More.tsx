import React from 'react'
import { ViewStyle } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styled from 'src/styled-components'

const Wrapper = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 16px;
  height: 32px;
  width: 32px;
`

// top: 1 - так как не удалось поправить высоту через line-height
const DotsIcon = styled(Icon).attrs(({ theme }) => ({
  color: theme.colors.textMain,
  name: 'dots-horizontal',
  size: 20,
}))`
  top: 1px;
`

interface Props {
  onPress?: () => void
  style?: ViewStyle
}

const More: React.FC<Props> = ({ style, onPress }) => (
  <Wrapper onPress={onPress} style={style}>
    <DotsIcon />
  </Wrapper>
)

export default More
