import { render } from '../../jest/test-utils'
import { NavigationList } from 'src/components'
import React from 'react'

describe('NavigationList', () => {
  const props = {
    items: [
      {
        title: 'title',
        onPress: () => 'hello',
      },
    ],
  }

  it('renders correctly with props', () => {
    const { asJSON } = render(<NavigationList {...props} />)
    expect(asJSON()).toMatchSnapshot()
  })
  it('renders correctly with empty array as props', () => {
    const { asJSON } = render(<NavigationList items={[]} />)
    expect(asJSON()).toMatchSnapshot()
  })
})
