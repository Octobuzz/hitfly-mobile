import { render } from '../../jest/test-utils'
import React from 'react'
import { Input } from 'src/components/fields'
import { ThemeProvider } from 'src/styled-components'
import theme from 'src/theme'

describe('Input', () => {
  const props = {
    RightIcon: {
      type: null,
      props: null,
      key: null,
    },
    label: 'label',
    field: {
      onChange: jest.fn(),
      onBlur: jest.fn(),
      value: 123,
      name: 'name',
    },
    form: {
      errors: {},
      touched: false,
      isValidating: false,
      values: null,
      isSubmitting: false,
      submitCount: 123,
    },
  }

  it('renders correctly', () => {
    const { debug } = render(
      <ThemeProvider theme={theme}>
        <Input {...props} />
      </ThemeProvider>,
    )
    // expect(asJSON()).toMatchSnapshot()
    debug()
  })
})
