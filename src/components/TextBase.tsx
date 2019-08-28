import styled from 'src/styled-components'

enum FontFamilies {
  regular = 'GothamPro',
  bold = 'GothamPro-Bold',
  black = 'GothamPro-Black',
  medium = 'GothamPro-Medium',
}

interface ITextBase {
  color?: string
  fontType?: 'medium' | 'regular' | 'bold' | 'black'
}

const TextBase = styled.Text<ITextBase>`
  font-family: ${({ fontType }) =>
    fontType ? FontFamilies[fontType] : FontFamilies.regular};
  font-size: 16px;
  color: ${({ color, theme }) => color || theme.colors.textMain};
`

export default TextBase
