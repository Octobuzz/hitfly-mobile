import React from 'react'
import { render, ReactTestInstanceExtended } from '../../jest/test-utils'
import { SafeView } from 'src/components/views'

describe('SafeView', () => {
  it('renders correctly', () => {
    const { container } = render(<SafeView />)
    expect(container.children[0] as ReactTestInstanceExtended).toMatchSnapshot()
  })
})
