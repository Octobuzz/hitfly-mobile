import { render } from '../../jest/test-utils'
import React from 'react'
import { Stretcher } from '../../src/components/views'

describe('Stretcher', () => {
  it('renders correctly', () => {
    const { asJSON } = render(<Stretcher />)
    expect(asJSON()).toMatchSnapshot()
  })
})
