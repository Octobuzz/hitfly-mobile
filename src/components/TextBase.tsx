import styled from 'src/styled-components'

const TextBase = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 16px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.textMain};
`

export const HelperText = styled(TextBase)`
  color: ${({ theme }) => theme.colors.textAlt};
  text-align: center;
  margin-bottom: 40px;
`

export const H1 = styled(TextBase)`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 20px;
`

export const H2 = styled(TextBase)`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 16px;
`

export default TextBase
