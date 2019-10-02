import styled from 'src/styled-components'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { IView } from './interfaces'

const View = styled.View<IView>`
  ${({ noFill }) => !noFill && 'flex: 1;'}
  padding-top: ${({
    noPadding,
    noVerticalPadding,
    paddingTop,
    paddingVertical,
  }) =>
    noVerticalPadding || noPadding ? 0 : paddingTop || paddingVertical || 16}px;
  padding-bottom: ${({
    noPadding,
    noVerticalPadding,
    paddingBottom,
    paddingVertical,
    addBottomSafePadding,
  }) => {
    let padding =
      noVerticalPadding || noPadding
        ? 0
        : paddingBottom || paddingVertical || 16
    if (addBottomSafePadding) {
      padding += getBottomSpace()
    }
    return padding
  }}px;
  padding-horizontal:  ${({ noHorizontalPadding, noPadding }) =>
    noHorizontalPadding || noPadding ? 0 : 16}px;
`

export default View
