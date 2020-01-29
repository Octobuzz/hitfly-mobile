import React from 'react'
import { render } from '../../jest/test-utils'
import { Stretcher } from 'src/components/views'

describe('Stretcher', () => {
  it('renders correctly', () => {
    const { asJSON } = render(<Stretcher />)
    expect(asJSON()).toMatchSnapshot()
  })
})
