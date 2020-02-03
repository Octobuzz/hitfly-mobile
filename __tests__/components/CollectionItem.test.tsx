import React from 'react'
import { render } from '../../jest/test-utils'
import { CollectionItem } from 'src/components'
import { Collection } from 'src/apollo'

describe('CollectionItem', () => {
  const item = {
    title: 'title',
    tracksCountInPlaylist: 10,
    image: [{ imageUrl: 'url' }],
  } as Collection

  it('renders correctly', () => {
    const props = {
      collection: item,
      onPress: jest.fn(),
    }
    const { asJSON } = render(<CollectionItem {...props} />)

    expect(asJSON()).toMatchSnapshot()
  })

  it('renders correctly with sizes', () => {
    const props = {
      collection: item,
      onPress: jest.fn(),
      width: 100,
      height: 100,
    }

    const { asJSON } = render(<CollectionItem {...props} />)

    expect(asJSON()).toMatchSnapshot()
  })
})
