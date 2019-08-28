import * as styledComponents from 'styled-components/native'

export interface ThemeColors {
  brandBlue: string
  brandPink: string
  white: string
  textMain: string
  textAlt: string
  textGray: string
  inputBorder: string
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
  ThemeProvider,
} = styledComponents as styledComponents.ReactNativeThemedStyledComponentsModule<
  ITheme
>

export { css, ThemeProvider }
export default styled
