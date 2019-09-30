import { getBottomSpace } from 'react-native-iphone-x-helper'
import { IView } from './interfaces'
import styled from 'src/styled-components'

const ScrollView = styled.ScrollView.attrs(
  ({
    noPadding,
    paddingTop,
    paddingBottom,
    paddingVertical,
    noVerticalPadding,
    noHorizontalPadding,
    addBottomSafePadding,
  }: IView) => {
    let pBottom =
      noVerticalPadding || noPadding
        ? 0
        : paddingBottom || paddingVertical || 16

    if (addBottomSafePadding) {
      pBottom += getBottomSpace()
    }

    return {
      contentContainerStyle: {
        paddingBottom: pBottom,
        paddingTop:
          noVerticalPadding || noPadding
            ? 0
            : paddingTop || paddingVertical || 16,
        paddingVertical: noVerticalPadding || noPadding ? 0 : 16,
        paddingHorizontal: noHorizontalPadding || noPadding ? 0 : 16,
      },
    }
  },
)<IView>`
  ${({ noFill }) => !noFill && 'flex: 1;'}
`

export default ScrollView
