import L from 'lodash'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { IView } from './interfaces'
import styled from 'src/styled-components'

const View = styled.View<IView>`
  ${({ noFill }) => !noFill && 'flex: 1;'}
  padding-top: ${({
    noPadding,
    noVerticalPadding,
    paddingTop,
    paddingVertical,
  }) =>
    noVerticalPadding || noPadding
      ? 0
      : L.without([paddingTop, paddingVertical, 16], undefined)[0]}px;
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
        : (L.without(
            [paddingBottom, paddingVertical, 16],
            undefined,
          )[0] as number)
    if (addBottomSafePadding) {
      padding += getBottomSpace()
    }
    return padding
  }}px;
  padding-horizontal:  ${({
    noHorizontalPadding,
    paddingHorizontal,
    noPadding,
  }) =>
    noHorizontalPadding || noPadding
      ? 0
      : L.without([paddingHorizontal, 16], undefined)[0]}px;
`

export default View
