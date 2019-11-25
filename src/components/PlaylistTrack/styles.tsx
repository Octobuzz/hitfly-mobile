import styled from 'src/styled-components'
import TextBase from '../TextBase'

export const CenterBlock = styled.View`
  flex: 1;
  margin-horizontal: 16px;
`

export const TitleText = styled(TextBase)`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 12px;
  line-height: 18px;
`

export const TitleWhiteText = styled(TitleText)`
  color: ${({ theme }) => theme.colors.white};
`

export const SubTitleText = styled(TextBase)`
  font-size: 10px;
  line-height: 12px;
  color: ${({ theme }) => theme.colors.textAlt};
`

export const SubTitleWhiteText = styled(SubTitleText)`
  color: ${({ theme }) => theme.colors.white};
`
