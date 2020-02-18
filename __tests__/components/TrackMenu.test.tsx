import React from 'react'
import {
  render,
  fireEvent,
  ReactTestInstanceExtended,
} from '../../jest/test-utils'
import { TrackMenu } from 'src/components'
import { Track } from 'src/apollo'

describe('TrackMenu', () => {
  const track = {
    title: 'title',
    id: 2,
    cover: [{}],
  } as Track

  it('renders correctly', () => {
    const { container } = render(<TrackMenu track={track} />)
    expect(container.children[0] as ReactTestInstanceExtended).toMatchSnapshot()
  })

  it('renders correctly with liked track', () => {
    const likedTrack = { ...track, isFavorite: true }
    const { container } = render(<TrackMenu track={likedTrack} />)

    expect(container.children[0] as ReactTestInstanceExtended).toMatchSnapshot()
  })

  it('can be liked', () => {
    const onPressLike = jest.fn()
    const { getByTestId } = render(
      <TrackMenu onPressLike={onPressLike} track={track} />,
    )
    fireEvent.press(getByTestId('like'))
    expect(onPressLike).toBeCalled()
  })

  it('can be unliked', () => {
    const onPressLike = jest.fn()
    const likedTrack = { ...track, isFavorite: true } as Track
    const { getByTestId } = render(
      <TrackMenu onPressLike={onPressLike} track={likedTrack} />,
    )
    fireEvent.press(getByTestId('like'))
    expect(onPressLike).toBeCalled()
  })

  it('allows to press cancel button', () => {
    const onPressCancel = jest.fn()
    const { getByTestId } = render(
      <TrackMenu onPressCancel={onPressCancel} track={track} />,
    )
    fireEvent.press(getByTestId('cancel'))
    expect(onPressCancel).toBeCalled()
  })
})
