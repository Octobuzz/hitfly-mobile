import styled from 'src/styled-components'

interface ITextBase {
  color?: string
}

const TextBase = styled.Text<ITextBase>`
  font-family: 'GothamPro';
  font-weight: 400;
  font-size: 16px;
  color: ${({ color, theme }) => color || theme.colors.textMain};
`

export default TextBase
