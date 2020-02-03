import React from 'react'
import { render, fireEvent } from '../../../jest/test-utils'
import AlbumsDetailedScreen, {
  AlbumsDetailedScreenProps,
} from 'src/screens/AlbumsDetailed/AlbumsDetailed'
import { Album } from 'src/apollo'

describe('AlbumsDetailedScreen', () => {
  const album = {
    id: 1,
    title: 'title',
    cover: [{ imageUrl: 'url' }],
    author: 'author',
  } as Album
  const staticProps: AlbumsDetailedScreenProps = {
    albums: [album],
    isFetchingMore: false,
    isRefreshing: false,
    isLoading: false,
  }
  it('renders correctly', () => {
    const { asJSON } = render(<AlbumsDetailedScreen {...staticProps} />)

    expect(asJSON()).toMatchSnapshot()
  })
  it('renders correctly without albums', () => {
    const props: AlbumsDetailedScreenProps = {
      ...staticProps,
      albums: [],
    }
    const { asJSON } = render(<AlbumsDetailedScreen {...props} />)

    expect(asJSON()).toMatchSnapshot()
  })

  it('renders correctly in loading state', () => {
    const props: AlbumsDetailedScreenProps = {
      ...staticProps,
      isLoading: true,
    }
    const { asJSON } = render(<AlbumsDetailedScreen {...props} />)

    expect(asJSON()).toMatchSnapshot()
  })

  it('renders correctly in refreshing state', () => {
    const props: AlbumsDetailedScreenProps = {
      ...staticProps,
      isRefreshing: true,
    }
    const { asJSON } = render(<AlbumsDetailedScreen {...props} />)

    expect(asJSON()).toMatchSnapshot()
  })

  it('renders correctly in fetchingMore state', () => {
    const props: AlbumsDetailedScreenProps = {
      ...staticProps,
      isFetchingMore: true,
    }
    const { asJSON } = render(<AlbumsDetailedScreen {...props} />)

    expect(asJSON()).toMatchSnapshot()
  })

  it('allows to press first album item', () => {
    const props: AlbumsDetailedScreenProps = {
      ...staticProps,
      onPressAlbum: jest.fn(),
    }
    const { getByTestId } = render(<AlbumsDetailedScreen {...props} />)

    fireEvent.press(getByTestId('albumItem'))

    expect(props.onPressAlbum).toBeCalled()
  })
})
