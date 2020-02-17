import React from 'react'
import { TextInputUI } from 'src/components'
import { render, ReactTestInstanceExtended } from '../../../jest/test-utils'

describe('TextInputUI', () => {
  it('renders correctly', () => {
    const { container } = render(<TextInputUI value="value" label="label" />)

    expect(container.children[0] as ReactTestInstanceExtended).toMatchSnapshot()
  })

  it('renders correctly with error', () => {
    const { container } = render(
      <TextInputUI value="value" label="label" error="error" />,
    )

    expect(container.children[0] as ReactTestInstanceExtended).toMatchSnapshot()
  })
})
