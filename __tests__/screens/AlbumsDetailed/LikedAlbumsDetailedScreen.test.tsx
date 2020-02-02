import React from 'react'
import L from 'lodash'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { MockedProvider, MockedResponse } from '@apollo/react-testing'
import TestNavigator from '../../../jest/TestNavigator'
import {
  wait,
  render,
  fireEvent,
  NativeTestEvent,
} from '../../../jest/test-utils'
import { LikedAlbumsDetailedScreen } from 'src/screens/AlbumsDetailed'
import { Album, GET_LIKED_ALBUMS } from 'src/apollo'
import { names } from 'src/constants'
import { AlbumItem } from 'src/components'

jest.mock('src/components/AlbumItem')
;(AlbumItem as jest.Mock).mockImplementation(() => 'AlbumItem')

describe('LikedAlbumsDetailedScreen', () => {
  const album = ({
    id: 1,
    title: 'title',
    cover: [
      { imageUrl: 'url', sizeName: 's300x300', __typename: 'ImageSizeType' },
    ],
    author: 'author',
    __typename: 'Album',
  } as unknown) as Album

  const mockNavigation = {} as NavigationStackScreenProps

  const firstPageItems = L.range(0, names.DETAILED_LIMIT).map(id => ({
    album: { ...album, id },
    id,
    __typename: 'FavouriteAlbum',
  }))
  const secondPageItems = L.range(
    names.DETAILED_LIMIT,
    names.DETAILED_LIMIT + 5,
  ).map(id => ({
    album: { ...album, id },
    id,
    __typename: 'FavouriteAlbum',
  }))

  const mockRequest: MockedResponse = {
    request: {
      query: GET_LIKED_ALBUMS,
      variables: {
        page: 1,
        limit: names.DETAILED_LIMIT,
      },
    },
    result: {
      data: {
        albums: {
          items: firstPageItems,
          hasMorePages: true,
          __typename: 'FavouriteAlbumPagination',
        },
      },
    },
  }
  const mockFetchMore: MockedResponse = {
    request: {
      query: GET_LIKED_ALBUMS,
      variables: {
        page: 2,
        limit: names.DETAILED_LIMIT,
      },
    },
    result: {
      data: {
        albums: {
          items: [...firstPageItems, ...secondPageItems],
          hasMorePages: false,
          __typename: 'FavouriteAlbumPagination',
        },
      },
    },
  }

  it('renders correctly in all states', async () => {
    const { asJSON, getByTestId } = render(
      <TestNavigator>
        <MockedProvider mocks={[mockRequest, mockFetchMore]}>
          <LikedAlbumsDetailedScreen {...mockNavigation} />
        </MockedProvider>
      </TestNavigator>,
    )
    // загрузка
    expect(asJSON()).toMatchSnapshot()

    // рендер после загрузки
    await wait(() => {
      expect(asJSON()).toMatchSnapshot()
    })

    fireEvent(getByTestId('albumsScroll'), new NativeTestEvent('endReached'))

    // загрузка следующей страницы
    expect(asJSON()).toMatchSnapshot()

    // рендер следующей страницы
    await wait(() => {
      expect(asJSON()).toMatchSnapshot()
    })
  })
})
