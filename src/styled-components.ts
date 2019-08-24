import * as styledComponents from 'styled-components/native'

export interface ITheme {
  colors: {
    brandBlue: string
    brandPink: string
  }
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
