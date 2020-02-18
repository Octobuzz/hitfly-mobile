import React from 'react'
import {
  render,
  fireEvent,
  ReactTestInstanceExtended,
} from '../../jest/test-utils'
import { NavigationList } from 'src/components'

describe('NavigationList', () => {
  it('renders correctly with props', () => {
    const props = {
      items: [
        {
          title: 'title',
          onPress: jest.fn(),
        },
      ],
    }

    const { getAllByTestId } = render(<NavigationList {...props} />)

    fireEvent.press(getAllByTestId('item')[0])
    expect(props.items[0].onPress).toBeCalled()
  })

  it('renders correctly with empty items', () => {
    const { container } = render(<NavigationList items={[]} />)

    expect(container.children[0] as ReactTestInstanceExtended).toMatchSnapshot()
  })

  it('renders correctly with 2 items', () => {
    const props = {
      items: [
        {
          title: 'title',
          onPress: jest.fn(),
        },
        {
          title: 'title2',
          onPress: jest.fn(),
        },
      ],
    }
    const { container } = render(<NavigationList {...props} />)

    expect(container.children[0] as ReactTestInstanceExtended).toMatchSnapshot()
  })
})
