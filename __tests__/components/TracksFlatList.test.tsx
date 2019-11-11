import { render } from '../../jest/test-utils'
import { TracksFlatList } from 'src/components'
import React from 'react'
import { Track } from 'src/apollo'

describe('TrackFlatList', () => {
  const items = {
    title: 'title',
    songText: 'song text',
    singer: 'singer',
    id: 2,
    cover: [{}],
  } as Track

  const props = {
    toggleTrack: jest.fn(),
    showDetailedTrack: jest.fn(),
    activeTrackId: null,
    tracks: [items],
  }

  it('renders correctly', () => {
    const { asJSON } = render(<TracksFlatList {...props} />)
    expect(asJSON()).toMatchSnapshot()
  })
})
