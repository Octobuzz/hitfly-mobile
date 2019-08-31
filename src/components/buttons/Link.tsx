import React from 'react'
import styled from 'src/styled-components'
import TextBase from 'src/components/TextBase'
import { ButtonBase } from './interfaces'
import { disabledStyle } from './Button'

const Wrapper = styled.TouchableOpacity`
  ${disabledStyle}
`

const Text = styled(TextBase)`
  color: ${({ theme }) => theme.colors.brandPink};
  text-align: center;
`

const Link = ({ title, onPress, style, isDisabled }: ButtonBase) => (
  <Wrapper disabled={isDisabled} style={style} onPress={onPress}>
    <Text>{title}</Text>
  </Wrapper>
)

export default Link
