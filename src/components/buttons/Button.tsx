import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import TextBase from 'src/components/TextBase'
import Loader from 'src/components/Loader'
import { ButtonBase } from './interfaces'
import styled, { css } from 'src/styled-components'

export const disabledStyle = css`
  ${({ disabled }: { disabled?: boolean }) => disabled && 'opacity: 0.4;'}
`

const Wrapper = styled.TouchableOpacity<IndentedHorizontal>`
  ${disabledStyle}
  ${({ withoutMargin }) => !withoutMargin && 'margin-horizontal: 20px;'}
`

const Inner = styled.View<ColorType & Loadable>`
  padding: ${({ isLoading }) => (isLoading ? 0 : 20)}px 29px;
  border-radius: 28px;
  margin: 1px;
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

const Text = styled(TextBase)<ColorType>`
  text-align: center;
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
`

const Gradient = styled(LinearGradient).attrs(({ theme }) => ({
  colors: [theme.colors.brandBlue, theme.colors.brandPink],
}))`
  border-radius: 28px;
`

interface ColorType {
  type?: 'outline' | 'outline-black' | 'gradient'
}

interface IndentedHorizontal {
  withoutMargin?: boolean
}

interface Loadable {
  isLoading?: boolean
}

interface Props extends ColorType, ButtonBase, IndentedHorizontal, Loadable {}

const Button: React.FC<Props> = ({
  type,
  title,
  isLoading,
  isDisabled,
  ...rest
}) => (
  <Wrapper disabled={isDisabled} {...rest}>
    <Gradient>
      <Inner isLoading={isLoading} type={type}>
        {isLoading ? <Loader size={61.7} /> : <Text type={type}>{title}</Text>}
      </Inner>
    </Gradient>
  </Wrapper>
)

export default Button
