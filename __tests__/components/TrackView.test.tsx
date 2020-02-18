import React from 'react'
import { TracksView, TracksViewProps } from 'src/components'
import { render, ReactTestInstanceExtended } from '../../jest/test-utils'
import { Track } from 'src/apollo'

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

    const { container } = render(<TracksView {...props} />)
    expect(container.children[0] as ReactTestInstanceExtended).toMatchSnapshot()
  })
  it('renders correctly with empty props', () => {
    const props: TracksViewProps = {
      tracks: [],
      isPlaying: true,
      playlistKey: 'playlistKey',
      toggleTrack: jest.fn(),
      showDetailedTrack: jest.fn(),
    }
    const { container } = render(<TracksView {...props} />)
    expect(container.children[0] as ReactTestInstanceExtended).toMatchSnapshot()
  })
})
