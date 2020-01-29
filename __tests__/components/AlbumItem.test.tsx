import React from 'react'
import { fireEvent, render } from '../../jest/test-utils'
import AlbumItem from 'src/components/AlbumItem'
import { Album } from 'src/apollo'

describe('AlbumItem', () => {
  const item = {
    title: 'title',
    cover: [{ imageUrl: 'url' }],
    author: 'author',
  } as Album

  it('renders correctly', () => {
    const props = {
      item,
    }
    const { asJSON } = render(<AlbumItem {...props} />)

    expect(asJSON()).toMatchSnapshot()
  })

  it('can be pressed', () => {
    const props = {
      item,
      onPress: jest.fn(),
    }
    const { getByTestId } = render(<AlbumItem {...props} />)

    fireEvent.press(getByTestId('wrapper'))
    expect(props.onPress).toHaveBeenCalled()
  })
})
