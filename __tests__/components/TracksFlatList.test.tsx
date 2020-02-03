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

  const staticProps: TracksFlatListProps = {
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

  it('renders correctly in default state', () => {
    const { asJSON } = render(<TracksFlatList {...staticProps} />)
    expect(asJSON()).toMatchSnapshot()
  })

  it('renders correctly in playing state', () => {
    const props: TracksFlatListProps = {
      ...staticProps,
      isPlaying: true,
      activeTrack: item,
    }

    const { asJSON } = render(<TracksFlatList {...props} />)
    expect(asJSON()).toMatchSnapshot()
  })

  it('renders correctly in fetching more state', () => {
    const props: TracksFlatListProps = {
      ...staticProps,
      isFetchingMore: true,
    }

    const { asJSON } = render(<TracksFlatList {...props} />)
    expect(asJSON()).toMatchSnapshot()
  })

  it('renders correctly in refreshing state', () => {
    const props: TracksFlatListProps = {
      ...staticProps,
      isRefreshing: true,
    }

    const { asJSON } = render(<TracksFlatList {...props} />)
    expect(asJSON()).toMatchSnapshot()
  })

  it('renders correctly without items', () => {
    const props: TracksFlatListProps = {
      ...staticProps,
      tracks: [],
    }

    const { asJSON } = render(<TracksFlatList {...props} />)
    expect(asJSON()).toMatchSnapshot()
  })
})
