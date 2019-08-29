import React from 'react'
import styled from 'src/styled-components'
import TextBase from 'src/components/TextBase'
import { ButtonBase } from './interfaces'

const Wrapper = styled.TouchableOpacity``

const Text = styled(TextBase)`
  color: ${({ theme }) => theme.colors.brandPink};
  text-align: center;
`

const Link = ({ title, onPress, style }: ButtonBase) => (
  <Wrapper style={style} onPress={onPress}>
    <Text>{title}</Text>
  </Wrapper>
)

export default Link
