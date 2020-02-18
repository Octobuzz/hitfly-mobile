import LFP from 'lodash/fp'
import React from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { MockedProvider, MockedResponse } from '@apollo/react-testing'
import TestNavigator from '../../../jest/TestNavigator'
import {
  wait,
  render,
  fireEvent,
  NativeTestEvent,
} from '../../../jest/test-utils'
import AlbumsDetailedContainer from 'src/screens/AlbumsDetailed/AlbumsDetailedContainer'
import { Album, FavouriteAlbum, GET_LIKED_ALBUMS } from 'src/apollo'

describe('AlbumsDetailedContainer', () => {
  const itemsSelector = LFP.getOr([], 'albums.items')
  const hasMorePagesSelector = LFP.get('albums.hasMorePages')
  const transformer = LFP.get('album')

  const album = ({
    id: 0,
    title: 'title',
    cover: [
      { imageUrl: 'url', sizeName: 's300x300', __typename: 'ImageSizeType' },
    ],
    author: 'author',
    __typename: 'Album',
  } as unknown) as Album

  const mockNavigation = {} as NavigationStackScreenProps

  const LIMIT = 1
  const NEXT_PAGE_OFFSET = 1

  const generateItem = (sample: Album, index: number): FavouriteAlbum =>
    ({
      album: { ...sample, id: index },
      id: index,
      __typename: 'FavouriteAlbum',
    } as FavouriteAlbum)
  const generatePage = ({
    limit,
    sample,
    idStartsFrom,
  }: {
    sample: Album
    limit: number
    idStartsFrom: number
  }): FavouriteAlbum[] => {
    const array = []
    for (let i = 0; i < limit; i++) {
      array[i] = generateItem(sample, idStartsFrom + i)
    }
    return array
  }

  const firstPageItems = generatePage({
    sample: album,
    idStartsFrom: 0,
    limit: LIMIT,
  })
  const secondPageItems = generatePage({
    sample: album,
    idStartsFrom: LIMIT,
    limit: NEXT_PAGE_OFFSET,
  })

  const mockRequest: MockedResponse = {
    request: {
      query: GET_LIKED_ALBUMS,
      variables: {
        page: 1,
        limit: LIMIT,
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
        limit: LIMIT,
      },
    },
    result: {
      data: {
        albums: {
          items: secondPageItems,
          hasMorePages: false,
          __typename: 'FavouriteAlbumPagination',
        },
      },
    },
  }

  it('renders correctly in all states', async () => {
    const { getByTestId, queryAllByTestId, queryByTestId } = render(
      <TestNavigator>
        <MockedProvider mocks={[mockRequest, mockFetchMore]}>
          <AlbumsDetailedContainer
            query={GET_LIKED_ALBUMS}
            transformer={transformer}
            itemsSelector={itemsSelector}
            hasMorePagesSelector={hasMorePagesSelector}
            limit={LIMIT}
            {...mockNavigation}
          />
        </MockedProvider>
      </TestNavigator>,
    )

    // загрузка
    getByTestId('loader')

    // рендер после загрузки
    await wait(() => {
      const items = queryAllByTestId('albumItem')
      expect(items.length).toEqual(LIMIT)
      expect(queryByTestId('loader')).toBeNull()
    })

    const albumsScroll = getByTestId('albumsScroll')
    fireEvent(albumsScroll, new NativeTestEvent('endReached'))

    // загрузка следующей страницы
    expect(
      albumsScroll.getProp('ListFooterComponent').props.isShown,
    ).toBeTruthy()
    getByTestId('loader')

    // рендер следующей страницы
    await wait(() => {
      const items = queryAllByTestId('albumItem')
      expect(items.length).toEqual(LIMIT + NEXT_PAGE_OFFSET)
      expect(
        albumsScroll.getProp('ListFooterComponent').props.isShown,
      ).toBeFalsy()
      expect(queryByTestId('loader')).toBeNull()
    })
  })
})
