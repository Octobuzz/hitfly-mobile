import React from 'react'
import { PlaylistTrack } from 'src/components'
import { Track } from 'src/apollo'
import { render } from '../../jest/test-utils'

describe('PlaylistTrack', () => {
  const track = {
    id: 1,
    cover: [
      {
        imageUrl:
          'https://images.unsplash.com/photo-1541233349642-6e425fe6190e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
      },
    ],
    title: 'Some track title',
    group: {
      title: 'Some group title',
    },
  } as Track
  it('renders correctly in paused state', () => {
    const { asJSON } = render(<PlaylistTrack track={track} index={1} />)
    expect(asJSON()).toMatchSnapshot()
  })

  it('renders correctly in played state', () => {
    const { asJSON } = render(
      <PlaylistTrack isPlaying track={track} index={1} />,
    )
    expect(asJSON()).toMatchSnapshot()
  })
})
