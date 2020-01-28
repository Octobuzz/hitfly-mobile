import React from 'react'
import { TracksView, TracksViewProps } from '../../src/components'
import { render } from '../../jest/test-utils'
import { Track } from '../../src/apollo'

describe('TrackView', () => {
  const item = {
    title: 'title',
    singer: 'singer',
    songText: 'song text',
    id: 20,
    cover: [{}],
  } as Track

  it('renders correctly', () => {
    const props: TracksViewProps = {
      tracks: [item],
      isPlaying: true,
      activeTrack: item,
      playlistKey: 'playlistKey',
      toggleTrack: jest.fn(),
      showDetailedTrack: jest.fn(),
    }

    const { asJSON } = render(<TracksView {...props} />)
    expect(asJSON()).toMatchSnapshot()
  })
  it('renders correctly with empty props', () => {
    const props: TracksViewProps = {
      tracks: [],
      isPlaying: true,
      playlistKey: 'playlistKey',
      toggleTrack: jest.fn(),
      showDetailedTrack: jest.fn(),
    }
    const { asJSON } = render(<TracksView {...props} />)
    expect(asJSON()).toMatchSnapshot()
  })
})
