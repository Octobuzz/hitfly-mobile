import React from 'react'
import styled from 'src/styled-components'
import TextBase from 'src/components/TextBase'
import LinearGradient from 'react-native-linear-gradient'
import { ButtonBase } from './interfaces'

const Inner = styled.TouchableOpacity<ColorType>`
  padding: 20px 29px;
  border-radius: 28px;
  ${({ theme, type }) =>
    type === 'outline' &&
    `
    margin: 1px;
    background-color: ${theme.colors.white};
  `}
`

const Text = styled(TextBase)<ColorType>`
  color: ${({ theme, type }) =>
    type === 'gradient' ? theme.colors.white : theme.colors.textMain};
  text-align: center;
`

const Gradient = styled(LinearGradient).attrs(({ theme }) => ({
  colors: [theme.colors.brandBlue, theme.colors.brandPink],
}))<Margined>`
  ${({ withMargin }) => withMargin && `margin-horizontal: 20px;`}
  border-radius: 28px;
`

interface ColorType {
  type?: 'outline' | 'gradient'
}

interface Margined {
  withMargin?: boolean
}

interface Props extends ColorType, ButtonBase, Margined {}

class Button extends React.Component<Props> {
  static defaultProps = {
    type: 'gradient',
    withMargin: true,
  }

  render() {
    const { title, type, style, withMargin, onPress } = this.props
    return (
      <Gradient withMargin={withMargin} style={style}>
        <Inner onPress={onPress} type={type}>
          <Text type={type}>{title}</Text>
        </Inner>
      </Gradient>
    )
  }
}

export default Button
