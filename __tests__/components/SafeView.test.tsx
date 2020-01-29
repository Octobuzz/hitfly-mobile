import React from 'react'
import { render } from '../../jest/test-utils'
import { SafeView } from 'src/components/views'

describe('SafeView', () => {
  it('renders correctly', () => {
    const { asJSON } = render(<SafeView />)
    expect(asJSON()).toMatchSnapshot()
  })
})
