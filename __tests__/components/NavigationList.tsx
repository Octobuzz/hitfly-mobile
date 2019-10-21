import { render } from '../../jest/test-utils'
import { NavigationList } from 'src/components'
import React from 'react'

describe('NavigationList', () => {
  const props = {
    items: [
      {
        title: 'title',
        onPress: jest.fn(),
      },
    ],
  }

  it('renders correctly', () => {
    const { asJSON } = render(<NavigationList {...props} />)
    expect(asJSON()).toMatchSnapshot()
  })
})
