import styled from 'src/styled-components'

const Block = styled.View`
  padding-vertical: 24px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.inputBorder};
`

export default Block
