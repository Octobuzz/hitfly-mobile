import { Dimensions, PixelRatio, Platform, StatusBar } from 'react-native'
import { isIphoneX } from 'react-native-iphone-x-helper'

const D = Dimensions.get('window')

export const WINDOW_WIDTH = D.width
export const WINDOW_HEIGHT =
  Platform.OS === 'ios' ? D.height : D.height - StatusBar.currentHeight
export const PIXEL_RATIO = PixelRatio.get()
export const NAVBAR_HEIGHT =
  Platform.OS === 'ios' ? (isIphoneX() ? 88 : 64) : 54

export const BUTTON_HEIGHT = PIXEL_RATIO < 3 ? 32 + (24 / 3) * PIXEL_RATIO : 56
export const BUTTON_MAX_WIDTH = WINDOW_WIDTH * 0.75

export const INPUT_HEIGHT = 48

export const MIN_PLAYER_HEIGHT = 64
export const MIN_PLAYER_TIMELINE_HEIGHT = 8
export const FULL_PLAYER_TIMELINE_TOP_HEIGHT = 86
export const FULL_PLAYER_TIMELINE_BOTTOM_HEIGHT = 42
export const FULL_PLAYER_TIME_PIN_HEIGHT = 24

export const PARALLAX_HEADER_MAX_HEIGHT = WINDOW_WIDTH * 0.8

export const CORRECT_PIXEL_RATIO_SIZE = (size = 1) =>
  PIXEL_RATIO < 3 ? size / 2 + (size / 2 / 3) * PIXEL_RATIO : size
