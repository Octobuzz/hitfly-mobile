import React from 'react'
import { CheckBoxUI } from 'src/components'
import { ThemeProvider } from 'src/styled-components'
import { render } from '../../jest/test-utils'
import theme from 'src/theme'

describe('CheckBoxUI', () => {
  it('renders correctly in checked state', () => {
    const { asJSON } = render(
      <ThemeProvider theme={theme}>
        <CheckBoxUI isChecked>test</CheckBoxUI>
      </ThemeProvider>,
    )

    expect(asJSON()).toMatchSnapshot()
  })

  it('renders correctly in unchecked state', () => {
    const { asJSON } = render(
      <ThemeProvider theme={theme}>
        <CheckBoxUI isChecked={false}>test</CheckBoxUI>
      </ThemeProvider>,
    )

    expect(asJSON()).toMatchSnapshot()
  })
})
