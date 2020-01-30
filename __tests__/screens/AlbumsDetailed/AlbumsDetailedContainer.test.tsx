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

  const mockNavigation = {} as NavigationStackScreenProps
  const mock: MockedResponse = {
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
          items: [
            {
              id: 1,
              album: { ...album, __typename: 'Album' },
              __typename: 'FavouriteAlbum',
            },
          ],
          hasMorePages: true,
          __typename: 'FavouriteAlbumPagination',
        },
      },
    },
  }

  it('renders in loading state', () => {
    const { asJSON } = render(
      <TestNavigator>
        <MockedProvider mocks={[mock]}>
          <LikedAlbumsDetailedScreen {...mockNavigation} />
        </MockedProvider>
      </TestNavigator>,
    )

    expect(asJSON()).toMatchSnapshot()
  })

  it('renders album', async () => {
    const { asJSON } = render(
      <TestNavigator>
        <MockedProvider mocks={[mock]}>
          <LikedAlbumsDetailedScreen {...mockNavigation} />
        </MockedProvider>
      </TestNavigator>,
    )

    return await wait(() => {
      expect(asJSON()).toMatchSnapshot()
    })
  })
})
