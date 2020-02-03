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
import { MyAlbumsDetailedScreen } from 'src/screens/AlbumsDetailed'
import { Album, GET_MY_ALBUMS } from 'src/apollo'
import { AlbumItem } from 'src/components'

// для уменьшения размера снапшота
jest.mock('src/components/AlbumItem')
;(AlbumItem as jest.Mock).mockImplementation(() => 'AlbumItem')

describe('MyAlbumsDetailedScreen', () => {
  const album = ({
    id: 1,
    title: 'title',
    cover: [
      { imageUrl: 'url', sizeName: 's300x300', __typename: 'ImageSizeType' },
    ],
    author: 'author',
    __typename: 'Album',
  } as unknown) as Album

  const LIMIT = 1
  const NEXT_PAGE_OFFSET = 1

  const mockNavigation = {} as NavigationStackScreenProps

  const firstPageItems = L.range(0, LIMIT).map(id => ({
    ...album,
    id,
  }))
  const secondPageItems = L.range(LIMIT, LIMIT + NEXT_PAGE_OFFSET).map(id => ({
    ...album,
    id,
  }))

  const mockRequest: MockedResponse = {
    request: {
      query: GET_MY_ALBUMS,
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
          __typename: 'AlbumPagination',
        },
      },
    },
  }
  const mockFetchMore: MockedResponse = {
    request: {
      query: GET_MY_ALBUMS,
      variables: {
        page: 2,
        limit: LIMIT,
      },
    },
    result: {
      data: {
        albums: {
          items: [...firstPageItems, ...secondPageItems],
          hasMorePages: false,
          __typename: 'AlbumPagination',
        },
      },
    },
  }

  it('renders correctly in all states', async () => {
    const { asJSON, getByTestId } = render(
      <TestNavigator>
        <MockedProvider mocks={[mockRequest, mockFetchMore]}>
          <MyAlbumsDetailedScreen limit={LIMIT} {...mockNavigation} />
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
