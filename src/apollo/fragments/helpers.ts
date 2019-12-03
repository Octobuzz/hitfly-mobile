import { PixelRatio } from 'react-native'

const MAX_RATIO = 3.5

export const getAdjustedPixelRatio = (): number => {
  const ratio = PixelRatio.get()
  return Math.min(ratio, MAX_RATIO)
}
