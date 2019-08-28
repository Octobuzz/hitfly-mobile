import styled from 'src/styled-components'

enum FontFamilies {
  light = 'GothamPro-Light',
  regular = 'GothamPro-Regular',
  bold = 'GothamPro-Bold',
  black = 'GothamPro-Black',
}

interface ITextBase {
  color?: string
  fontType?: 'light' | 'regular' | 'bold' | 'black'
}

const TextBase = styled.Text<ITextBase>`
  font-family: ${({ fontType }) =>
    fontType ? FontFamilies[fontType] : FontFamilies.regular};
  font-size: 16px;
  color: ${({ color, theme }) => color || theme.colors.textMain};
`

export default TextBase
