import { render } from '../../jest/test-utils'
import React from 'react'
import { InputBase } from '../../src/components/fields/interfaces'
import { FieldProps } from 'formik'
import { Input } from 'src/components/fields'

describe('Input', () => {
  const props = {
    form: {
      errors: {},
      touched: {},
    },
    label: 'label',
    RightIcon: {},
    field: {
      name: 'name',
      onChange: (value: any) => value,
      onBlur: (value: any) => value,
      value: 123,
    },
  } as InputBase & FieldProps

  it('renders correctly', () => {
    const { asJSON } = render(<Input {...props} />)

    expect(asJSON()).toMatchSnapshot()
  })
})
