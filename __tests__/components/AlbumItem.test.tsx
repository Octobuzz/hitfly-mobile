import React from 'react'
import {
  render,
  fireEvent,
  ReactTestInstanceExtended,
} from '../../jest/test-utils'
import AlbumItem from 'src/components/AlbumItem'
import { Album } from 'src/apollo'

describe('AlbumItem', () => {
  const item = {
    id: 1,
    title: 'title',
    cover: [{ imageUrl: 'url' }],
    author: 'author',
  } as Album

  it('renders correctly', () => {
    const props = {
      item,
    }
    const { container } = render(<AlbumItem {...props} />)

    expect(container.children[0] as ReactTestInstanceExtended).toMatchSnapshot()
  })

  it('can be pressed', () => {
    const props = {
      item,
      onPress: jest.fn(),
    }
    const { getByTestId } = render(<AlbumItem {...props} />)

    fireEvent.press(getByTestId('albumItem'))
    expect(props.onPress).toHaveBeenCalled()
  })
})
