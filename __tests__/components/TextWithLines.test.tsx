import React from 'react'
import { TextWithLines } from 'src/components'
import { render } from '../../jest/test-utils'

describe('TextWithLines', () => {
  it('renders correctly', () => {
    const { asJSON } = render(<TextWithLines />)
    expect(asJSON()).toMatchSnapshot()
  })
})
