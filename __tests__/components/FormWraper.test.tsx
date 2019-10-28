import { render } from '../../jest/test-utils'
import { FormWrapper } from '../../src/components/views'
import React from 'react'

describe('FormWrapper', () => {
  it('renders correctly', () => {
    const { asJSON } = render(<FormWrapper />)
    expect(asJSON()).toMatchSnapshot()
  })
  it('renders correctly with scrollEnabled === false', () => {
    const { asJSON } = render(<FormWrapper scrollEnabled={false} />)
    expect(asJSON()).toMatchSnapshot()
  })
  it('renders correctly with scrollEnabled === true', () => {
    const { asJSON } = render(<FormWrapper scrollEnabled={true} />)
    expect(asJSON()).toMatchSnapshot()
  })
})
