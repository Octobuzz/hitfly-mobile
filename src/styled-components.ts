import * as styledComponents from 'styled-components/native'

export interface ThemeColors {
  brandBlue: string
  brandPink: string
  white: string
  textMain: string
  textAlt: string
  inputBorder: string
}

export interface ITheme {
  colors: ThemeColors
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
