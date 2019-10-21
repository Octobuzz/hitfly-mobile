import { render } from '../../jest/test-utils'
import { FormWrapper } from '../../src/components/views'
import React from 'react'

describe('FormWrapper', () => {
  it('renders correctly', () => {
    const { asJSON } = render(<FormWrapper />)
    expect(asJSON()).toMatchSnapshot()
  })
})
