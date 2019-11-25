import styled from 'src/styled-components'

const Block = styled.View<{ hideBorder?: boolean }>`
  padding-vertical: 24px;
  border-top-width: ${({ hideBorder }) => (hideBorder ? 0 : 1)}px;
  border-top-color: ${({ theme }) => theme.colors.inputBorder};
`

export default Block
