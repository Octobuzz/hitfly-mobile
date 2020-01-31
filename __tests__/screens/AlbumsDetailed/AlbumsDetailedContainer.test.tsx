import React from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { MockedProvider, MockedResponse } from '@apollo/react-testing'
import TestNavigator from '../../../jest/TestNavigator'
import { render, wait } from '../../../jest/test-utils'
import { LikedAlbumsDetailedScreen } from 'src/screens/AlbumsDetailed'
import { Album, GET_LIKED_ALBUMS } from 'src/apollo'
import { names } from 'src/constants'

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

  const albumsData = {
    albums: {
      items: [
        {
          id: 1,
          album,
          __typename: 'FavouriteAlbum',
        },
      ],
      hasMorePages: true,
      __typename: 'FavouriteAlbumPagination',
    },
  }
  const mockNavigation = {} as NavigationStackScreenProps
  const mockRequest: MockedResponse = {
    request: {
      query: GET_LIKED_ALBUMS,
      variables: {
        page: 1,
        limit: names.DETAILED_LIMIT,
      },
    },
    result: {
      data: albumsData,
    },
  }
  const mockFetchMore = {
    request: {
      query: GET_LIKED_ALBUMS,
      variables: {
        page: 2,
        limit: names.DETAILED_LIMIT,
      },
    },
    result: {
      data: {
        ...albumsData,
        albums: { ...albumsData.albums, hasMorePages: false },
      },
    },
  }

  it('renders correctly in all states', async () => {
    const { asJSON } = render(
      <TestNavigator>
        <MockedProvider mocks={[mockRequest, mockFetchMore]}>
          <LikedAlbumsDetailedScreen {...mockNavigation} />
        </MockedProvider>
      </TestNavigator>,
    )

    expect(asJSON()).toMatchSnapshot()

    await wait(() => {
      expect(asJSON()).toMatchSnapshot()
    })
  })
})
