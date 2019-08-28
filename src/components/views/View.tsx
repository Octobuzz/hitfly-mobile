import styled from 'src/styled-components'
import { IView } from './interfaces'

const View = styled.View<IView>`
  ${({ noFill }) => !noFill && 'flex: 1;'}
  padding-top: ${({ noVerticalPadding, paddingTop, paddingVertical }) =>
    noVerticalPadding ? 0 : paddingTop || paddingVertical || 16}px;
  padding-bottom: ${({ noVerticalPadding, paddingBottom, paddingVertical }) =>
    noVerticalPadding ? 0 : paddingBottom || paddingVertical || 16}px;
  padding-horizontal:  ${({ noHorizontalPadding }) =>
    noHorizontalPadding ? 0 : 16}px;
`

export default View
