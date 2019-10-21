import styled from 'src/styled-components'
import React from 'react'

const TextBase = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 16px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.textMain};
`

export const HelperText = styled(props => <TextBase {...props} />)`
  color: ${({ theme }) => theme.colors.textAlt};
  text-align: center;
  margin-bottom: 40px;
`

export const H1 = styled(props => <TextBase {...props} />)`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 20px;
`

export const H2 = styled(props => <TextBase {...props} />)`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 16px;
`

export default TextBase
