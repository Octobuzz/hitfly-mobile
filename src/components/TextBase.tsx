import styled from 'src/styled-components'

interface ITextBase {
  color?: string
  fontType?: 'medium' | 'regular' | 'bold' | 'black'
}

const TextBase = styled.Text<ITextBase>`
  font-family: ${({ fontType, theme: { fonts } }) =>
    fontType ? fonts[fontType] : fonts.regular};
  font-size: 16px;
  color: ${({ color, theme }) => color || theme.colors.textMain};
`

export default TextBase
