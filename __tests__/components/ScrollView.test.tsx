import { render } from '../../jest/test-utils'
import { ScrollView } from '../../src/components/views'
import React from 'react'

describe('ScrollView', () => {
  const props = {
    paddingTop: 10,
    paddingBottom: 20,
    paddingVertical: 40,
    paddingHorizontal: 10,
  }

  it('renders correctly', () => {
    const { asJSON } = render(<ScrollView />)
    expect(asJSON()).toMatchSnapshot()
  })
  it('renders', () => {
    const { asJSON } = render(
      <ScrollView noFill={false} noPadding={false} {...props} />,
    )
    expect(asJSON()).toMatchSnapshot()
  })
  it('renders', () => {
    const { asJSON } = render(
      <ScrollView noFill={true} noPadding={true} {...props} />,
    )
    expect(asJSON()).toMatchSnapshot()
  })
})
