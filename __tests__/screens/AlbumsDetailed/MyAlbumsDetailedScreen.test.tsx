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
import { names } from 'src/constants'
import { AlbumItem } from 'src/components'
jest.mock('src/components/AlbumItem')
;(AlbumItem as jest.Mock).mockImplementation(() => 'AlbumItem')

describe('MyAlbumsDetailedScreen', () => {
  // beforeAll(() => {
  // })
  // afterAll(() => {
  //   mockedItem.mockReset()
  // })

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
    ...album,
    id,
  }))
  const secondPageItems = L.range(
    names.DETAILED_LIMIT,
    names.DETAILED_LIMIT + 5,
  ).map(id => ({
    ...album,
    id,
  }))

  const mockRequest: MockedResponse = {
    request: {
      query: GET_MY_ALBUMS,
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
        limit: names.DETAILED_LIMIT,
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
          <MyAlbumsDetailedScreen {...mockNavigation} />
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
