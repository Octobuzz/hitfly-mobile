import L from 'lodash'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { IView } from './interfaces'
import styled from 'src/styled-components'

const ScrollView = styled.ScrollView.attrs(
  ({
    noPadding,
    paddingTop,
    paddingBottom,
    paddingVertical,
    paddingHorizontal,
    noVerticalPadding,
    noHorizontalPadding,
    addBottomSafePadding,
  }: IView) => {
    let pBottom =
      noVerticalPadding || noPadding
        ? 0
        : (L.without(
            [paddingBottom, paddingVertical, 16],
            undefined,
          )[0] as number)

    if (addBottomSafePadding) {
      pBottom += getBottomSpace()
    }

    return {
      contentContainerStyle: {
        paddingBottom: pBottom,
        paddingTop:
          noVerticalPadding || noPadding
            ? 0
            : L.without([paddingTop, paddingVertical, 16], undefined)[0],
        paddingVertical: noVerticalPadding || noPadding ? 0 : 16,
        paddingHorizontal:
          noHorizontalPadding || noPadding
            ? 0
            : L.without([paddingHorizontal, 16], undefined)[0],
      },
    }
  },
)<IView>`
  ${({ noFill }) => !noFill && 'flex: 1;'}
`

export default ScrollView
