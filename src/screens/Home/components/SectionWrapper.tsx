import styled from 'src/styled-components'

interface WithPadding {
  withPadding?: boolean
}

const Wrapper = styled.View<WithPadding>`
  margin-bottom: 40px;
  ${({ withPadding }) => withPadding && 'padding-horizontal: 16px;'}
`

export default Wrapper
