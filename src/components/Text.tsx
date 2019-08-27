import styled, { ThemeColors } from 'src/styled-components'

interface ITextBase {
  weightType?: 'bold' | 'light' | 'regular'
  color?: string
}

enum FontFamilies {
  light = 'GothamProLight',
  regular = 'GothamProRegular',
  bold = 'GothamProBold',
}

const TextBase = styled.Text<ITextBase>`
  font-family: ${({ weightType }) =>
    weightType ? FontFamilies[weightType] : FontFamilies.regular};
  font-size: 16px;
  color: ${({ color, theme }) => color || theme.colors.textMain};
`

export default TextBase
