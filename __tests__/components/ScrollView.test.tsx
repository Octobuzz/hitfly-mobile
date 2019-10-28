import { render } from '../../jest/test-utils'
import { ScrollView } from '../../src/components/views'
import React from 'react'

describe('sdd', () => {
  it('should', () => {
    const { asJSON } = render(<ScrollView />)
    expect(asJSON()).toMatchSnapshot()
  })
})
