import React from 'react'
import { TextWithLines } from 'src/components'
import { render, ReactTestInstanceExtended } from '../../jest/test-utils'

describe('TextWithLines', () => {
  it('renders correctly', () => {
    const { container } = render(<TextWithLines />)
    expect(container.children[0] as ReactTestInstanceExtended).toMatchSnapshot()
  })
})
