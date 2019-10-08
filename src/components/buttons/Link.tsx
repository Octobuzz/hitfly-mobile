import React from 'react'
import styled from 'src/styled-components'
import TextBase from 'src/components/TextBase'
import { ButtonBase } from './interfaces'
import { disabledStyle } from './Button'

const Wrapper = styled.TouchableOpacity`
  ${disabledStyle}
`

const Text = styled(TextBase)<ColorType>`
  ${({ type }) => type === 'dark' && `opacity: 0.5;`}
  color: ${({ theme, type = 'brand' }) =>
    type === 'brand' ? theme.colors.brandPink : theme.colors.white};
  text-align: center;
`

interface ColorType {
  type?: 'brand' | 'dark'
}

interface Props extends ButtonBase, ColorType {}

const Link: React.FC<Props> = ({ type, title, onPress, style, isDisabled }) => (
  <Wrapper disabled={isDisabled} style={style} onPress={onPress}>
    <Text type={type}>{title}</Text>
  </Wrapper>
)

export default Link
