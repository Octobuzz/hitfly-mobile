import { Dimensions } from 'react-native'

export const HIT_SLOP = { left: 10, top: 10, right: 10, bottom: 10 }

export const VIEW_HORIZONTAL_INDENTATION = 16
export const VIEW_VERTICAL_INDENTATION = 16

const { width } = Dimensions.get('window')

export const COL2_WIDTH = Math.trunc(
  (width - 3 * VIEW_HORIZONTAL_INDENTATION) / 2,
)

export const COL3_WIDTH = Math.trunc(
  (width - 5 * VIEW_HORIZONTAL_INDENTATION) / 3,
)
