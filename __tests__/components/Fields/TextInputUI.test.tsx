import React from 'react'
import { TextInputUI } from 'src/components'
import { render } from '../../../jest/test-utils'

describe('TextInputUI', () => {
  it('renders correctly', () => {
    const { asJSON } = render(<TextInputUI value="value" label="label" />)

    expect(asJSON()).toMatchSnapshot()
  })

  it('renders correctly with error', () => {
    const { asJSON } = render(
      <TextInputUI value="value" label="label" error="error" />,
    )

    expect(asJSON()).toMatchSnapshot()
  })
})
