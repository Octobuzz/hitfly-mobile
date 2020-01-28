import React from 'react'
import { render, fireEvent } from '../../../jest/test-utils'
import { PlaylistTrack } from 'src/components'
import { Track } from 'src/apollo'

describe('PlaylistTrack', () => {
  const track = {
    id: 1,
    cover: [
      {
        imageUrl: 'some url',
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

  it('renders without index', () => {
    const { asJSON } = render(
      <PlaylistTrack isPlaying hideIndex track={track} index={1} />,
    )
    expect(asJSON()).toMatchSnapshot()
  })

  it('can be pressed', () => {
    const onPress = jest.fn()
    const { getByTestId } = render(
      <PlaylistTrack track={track} onPress={onPress} index={1} />,
    )
    fireEvent.press(getByTestId('wrapper'))
    expect(onPress).toBeCalled()
  })
})
