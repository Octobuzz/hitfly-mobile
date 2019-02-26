import { Platform } from 'react-native'
import * as colors from './colors'

const baseFont = {
  color: colors.BLACK_LABEL,
  backgroundColor: 'transparent',
  fontSize: 12,
  lineHeight: 14,
  margin: 0,
  padding: 0,
}

const fonts = {
  light: {
    ...baseFont,
    fontFamily: Platform.OS === 'ios' ? 'GothamPro-Light' : 'GothamProLight',
  },
  lightItalic: {
    ...baseFont,
    fontFamily:
      Platform.OS === 'ios' ? 'GothamPro-LightItalic' : 'GothamProLightItalic',
  },
  regular: {
    ...baseFont,
    fontFamily: Platform.OS === 'ios' ? 'GothamPro' : 'GothamProRegular',
    fontWeight: '400',
  },
  italic: {
    ...baseFont,
    fontFamily: Platform.OS === 'ios' ? 'GothamPro-Italic' : 'GothamProItalic',
  },
  medium: {
    ...baseFont,
    fontFamily: Platform.OS === 'ios' ? 'GothamPro-Medium' : 'GothamProMedium',
  },
  mediumItalic: {
    ...baseFont,
    fontFamily:
      Platform.OS === 'ios'
        ? 'GothamPro-MediumItalic'
        : 'GothamProMediumItalic',
  },
  narrowMedium: {
    ...baseFont,
    fontFamily:
      Platform.OS === 'ios'
        ? 'GothamProNarrow-Medium'
        : 'GothamProNarrowMedium',
  },
  narrowBold: {
    ...baseFont,
    fontFamily:
      Platform.OS === 'ios' ? 'GothamProNarrow-Bold' : 'GothamProNarrowBold',
  },
  bold: {
    ...baseFont,
    fontFamily: Platform.OS === 'ios' ? 'GothamPro-Bold' : 'GothamProBold',
  },
  boldItalic: {
    ...baseFont,
    fontFamily:
      Platform.OS === 'ios' ? 'GothamPro-BoldItalic' : 'GothamProBoldItalic',
  },
  black: {
    ...baseFont,
    fontFamily: Platform.OS === 'ios' ? 'GothamPro-Black' : 'GothamProBlack',
  },
  blackItalic: {
    ...baseFont,
    // TODO: на ios не подцепляет GothamPro-BlackItalic
    fontFamily:
      Platform.OS === 'ios' ? 'GothamPro-Black' : 'GothamProBlackItalic',
    fontStyle: 'italic',
  },
}

export default {
  text: {
    ...fonts,
    navBarTitle: {
      ...fonts.bold,
      fontSize: 20,
      lineHeight: 22,
    },
  },
}
