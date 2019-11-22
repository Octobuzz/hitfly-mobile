import L from 'lodash'
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper'
import { Header } from 'react-navigation-stack'
import { IView } from './interfaces'
import { styles } from 'src/constants'
import styled from 'src/styled-components'

const View = styled.View<IView>`
  ${({ noFill }) => !noFill && 'flex: 1;'}
  padding-top: ${({
    noPadding,
    paddingTop,
    paddingVertical,
    noVerticalPadding,
    addTopSafePadding,
    addTopNavigationHeaderPadding,
  }) => {
    let padding =
      noVerticalPadding || noPadding
        ? 0
        : (L.without(
            [paddingTop, paddingVertical, styles.VIEW_VERTICAL_INDENTATION],
            undefined,
          )[0] as number)

    if (addTopNavigationHeaderPadding) {
      padding += Header.HEIGHT
    }

    if (addTopSafePadding) {
      padding += getStatusBarHeight()
    }

    return padding
  }}px;
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
            [paddingBottom, paddingVertical, styles.VIEW_VERTICAL_INDENTATION],
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
      : L.without(
          [paddingHorizontal, styles.VIEW_HORIZONTAL_INDENTATION],
          undefined,
        )[0]}px;
`

export default View
