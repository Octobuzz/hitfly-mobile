import { render } from '../../jest/test-utils'
import { SafeView } from '../../src/components/views'
import React from 'react'

describe('SafeView', () => {
  it('renders correctly', () => {
    const { asJSON } = render(<SafeView />)
    expect(asJSON()).toMatchSnapshot()
  })
})
