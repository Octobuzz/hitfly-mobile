import styled from 'src/styled-components'

const Stretcher = styled.View<{ gravity?: number }>`
  flex: ${({ gravity = 1 }) => gravity};
`

export default Stretcher
