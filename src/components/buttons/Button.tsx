import React from 'react'
import styled from 'src/styled-components'
import TextBase from 'src/components/Text'
import LinearGradient from 'react-native-linear-gradient'

const Wrapper = styled.TouchableOpacity<ColorType>`
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
}))`
  border-radius: 28px;
`

interface ColorType {
  type: 'outline' | 'gradient'
}

interface Props extends ColorType {
  title: string
}

class Button extends React.Component<Props> {
  render() {
    const { title, type } = this.props
    return (
      <Gradient>
        <Wrapper type={type}>
          <Text type={type}>{title}</Text>
        </Wrapper>
      </Gradient>
    )
  }
}

export default Button
