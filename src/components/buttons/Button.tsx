import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import TextBase from 'src/components/TextBase'
import Loader from 'src/components/Loader'
import { ButtonBase } from './interfaces'
import styled, { css } from 'src/styled-components'

export const disabledStyle = css`
  ${({ disabled }: { disabled?: boolean }) => disabled && `opacity: 0.4;`}
`

const Wrapper = styled.TouchableOpacity<IndentedHorizontal>`
  ${disabledStyle}
  ${({ withMargin = true }) => withMargin && `margin-horizontal: 20px;`}
`

const Text = styled(TextBase)<ColorType>`
  text-align: center;
  padding: 20px 29px;
  border-radius: 28px;
  overflow: hidden;
  color: ${({ theme, type = 'gradient' }) => {
    switch (type) {
      case 'outline-black':
      case 'gradient': {
        return theme.colors.white
      }
      case 'outline': {
        return theme.colors.textMain
      }
      default: {
        return theme.colors.textMain
      }
    }
  }};
  ${({ theme, type }) => {
    switch (type) {
      case 'outline': {
        return `background-color: ${theme.colors.white}`
      }
      case 'outline-black': {
        return `background-color: ${theme.colors.black}`
      }
    }
  }};
`

const Gradient = styled(LinearGradient).attrs(({ theme }) => ({
  colors: [theme.colors.brandBlue, theme.colors.brandPink],
}))`
  padding: 1px;
  border-radius: 28px;
`

interface ColorType {
  type?: 'outline' | 'outline-black' | 'gradient'
}

interface IndentedHorizontal {
  withMargin?: boolean
}

interface Props extends ColorType, ButtonBase, IndentedHorizontal {
  isLoading?: boolean
}

const Button: React.FC<Props> = ({
  type,
  title,
  style,
  onPress,
  isLoading,
  isDisabled,
}) => (
  <Wrapper disabled={isDisabled} onPress={onPress} style={style}>
    <Gradient>
      {isLoading ? <Loader size={61.7} /> : <Text type={type}>{title}</Text>}
    </Gradient>
  </Wrapper>
)

export default Button
