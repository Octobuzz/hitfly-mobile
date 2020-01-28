import { PixelRatio } from 'react-native'

const MAX_RATIO = 3.5

const ceil = (value: number, step = 1.0): number => {
  const inv = 1.0 / step
  return Math.ceil(value * inv) / inv
}

export const getAdjustedPixelRatio = (): number => {
  const ratio = ceil(PixelRatio.get(), 0.5)
  return Math.min(ratio, MAX_RATIO)
}
