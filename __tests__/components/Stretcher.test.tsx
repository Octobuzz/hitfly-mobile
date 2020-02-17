import React from 'react'
import { render, ReactTestInstanceExtended } from '../../jest/test-utils'
import { Stretcher } from 'src/components/views'

describe('Stretcher', () => {
  it('renders correctly', () => {
    const { container } = render(<Stretcher />)
    expect(container.children[0] as ReactTestInstanceExtended).toMatchSnapshot()
  })
})
