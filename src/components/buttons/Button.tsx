import React from 'react'
import TextBase from 'src/components/TextBase'
import LinearGradient from 'react-native-linear-gradient'
import styled, { css } from 'src/styled-components'
import { ButtonBase } from './interfaces'

export const disabledStyle = css`
  ${({ disabled }: { disabled?: boolean }) => disabled && `opacity: 0.4;`}
`

const Wrapper = styled.TouchableOpacity<ColorType & IndentedHorizontal>`
  ${disabledStyle}
  ${({ withMargin = true }) => withMargin && `margin-horizontal: 20px;`}
`

const Text = styled(TextBase)<ColorType>`
  text-align: center;
  padding: 20px 29px;
  border-radius: 28px;
  color: ${({ theme, type = 'gradient' }) =>
    type === 'gradient' ? theme.colors.white : theme.colors.textMain};
  ${({ theme, type }) =>
    type === 'outline' && `background-color: ${theme.colors.white}`};
`

const Gradient = styled(LinearGradient).attrs(({ theme }) => ({
  colors: [theme.colors.brandBlue, theme.colors.brandPink],
}))`
  padding: 1px;
  border-radius: 28px;
`

interface ColorType {
  type?: 'outline' | 'gradient'
}

interface IndentedHorizontal {
  withMargin?: boolean
}

interface Props extends ColorType, ButtonBase, IndentedHorizontal {}

const Button: React.FC<Props> = ({
  type,
  title,
  style,
  onPress,
  isDisabled,
}) => (
  <Wrapper disabled={isDisabled} onPress={onPress} type={type} style={style}>
    <Gradient>
      <Text type={type}>{title}</Text>
    </Gradient>
  </Wrapper>
)

export default Button
