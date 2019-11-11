import { TracksView } from '../../src/components'
import { render } from '../../jest/test-utils'
import React from 'react'
import { Track } from '../../src/apollo'

describe('TrackView', () => {
  const item = {
    title: 'title',
    singer: 'singer',
    songText: 'song text',
    id: 20,
    cover: [{}],
  } as Track

  const props = {
    tracks: [item],
    activeTrackId: '20',
    toggleTrack: jest.fn(),
    showDetailedTrack: jest.fn(),
  }

  const emptyProps = {
    tracks: [],
    activeTrackId: null,
    toggleTrack: jest.fn(),
    showDetailedTrack: jest.fn(),
  }

  it('renders correctly', () => {
    const { asJSON } = render(<TracksView {...props} />)
    expect(asJSON()).toMatchSnapshot()
  })
  it('renders correctly with empty props', () => {
    const { asJSON } = render(<TracksView {...emptyProps} />)
    expect(asJSON()).toMatchSnapshot()
  })
})
