import { render } from '../../jest/test-utils'
import { NavigationList } from 'src/components'
import React from 'react'
import { fireEvent } from '@testing-library/react-native'

describe('NavigationList', () => {
  const props = {
    items: [
      {
        title: 'title',
        onPress: jest.fn(),
      },
    ],
  }

  it('renders correctly with props', () => {
    const { asJSON, getByRole } = render(<NavigationList {...props} />)
    const firstRender = asJSON()

    fireEvent.press(getByRole('summary'))
    expect(firstRender).toMatchSnapshot(asJSON())
  })
  it('renders correctly with empty array as props', () => {
    const { asJSON } = render(<NavigationList items={[]} />)

    expect(asJSON()).toMatchSnapshot()
  })
})
