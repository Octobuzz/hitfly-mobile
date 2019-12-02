import * as styledComponents from 'styled-components/native'

export interface ThemeColors {
  brandBlue: string
  brandPink: string
  white: string
  gray: string
  black: string
  textMain: string
  textAlt: string
  textGray: string
  textWhite: string
  inputBorder: string
  transparent70: string
  transparent10: string
  transparentWhite50: string
  buttonUnderlayColor: string
}

export interface ThemeFonts {
  black: string
  bold: string
  medium: string
  regular: string
}

export interface ITheme {
  colors: ThemeColors
  fonts: ThemeFonts
}

const {
  default: styled,
  css,
  withTheme,
  ThemeProvider,
} = styledComponents as styledComponents.ReactNativeThemedStyledComponentsModule<
  ITheme
>

export { css, ThemeProvider, withTheme }
export default styled
