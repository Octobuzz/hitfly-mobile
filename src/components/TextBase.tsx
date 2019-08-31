import styled from 'src/styled-components'

interface ITextBase {
  color?: string
  fontType?: 'medium' | 'regular' | 'bold' | 'black'
}

const TextBase = styled.Text<ITextBase>`
  font-family: ${({ fontType, theme: { fonts } }) =>
    fontType ? fonts[fontType] : fonts.regular};
  font-size: 16px;
  line-height: 20px;
  color: ${({ color, theme }) => color || theme.colors.textMain};
`

export const HelperText = styled(TextBase)`
  color: ${({ theme }) => theme.colors.textAlt};
  text-align: center;
  margin-bottom: 40px;
`

export default TextBase
