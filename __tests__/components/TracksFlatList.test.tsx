import React from 'react'
import { render } from '../../jest/test-utils'
import { TracksFlatList, TracksFlatListProps } from 'src/components'
import { Track } from 'src/apollo'

describe('TrackFlatList', () => {
  const item = {
    title: 'title',
    songText: 'song text',
    singer: 'singer',
    id: 2,
    cover: [{}],
  } as Track

  it('renders correctly in default state', () => {
    const props: TracksFlatListProps = {
      toggleTrack: jest.fn(),
      showDetailedTrack: jest.fn(),
      tracks: [item],
      playlistTitle: 'title',
      onRefresh: jest.fn(),
      onEndReached: jest.fn(),
      isRefreshing: false,
      isFetchingMore: false,
      playlistKey: 'key',
      isPlaying: false,
    }

    const { asJSON } = render(<TracksFlatList {...props} />)
    expect(asJSON()).toMatchSnapshot()
  })
})
