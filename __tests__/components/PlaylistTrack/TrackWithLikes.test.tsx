import React from 'react'
import { render, fireEvent } from '../../../jest/test-utils'
import { TrackWithLikes } from 'src/components'
import { Track } from 'src/apollo'

describe('TrackWithLikes', () => {
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

  it('renders correctly', () => {
    const { asJSON } = render(<TrackWithLikes track={track} />)
    expect(asJSON()).toMatchSnapshot()
  })

  it('renders correctly in playing state', () => {
    const { asJSON } = render(<TrackWithLikes isPlaying track={track} />)
    expect(asJSON()).toMatchSnapshot()
  })

  it('renders correctly when liked', () => {
    const likedTrack = { ...track, isFavourite: true } as Track
    const { asJSON } = render(<TrackWithLikes track={likedTrack} />)
    expect(asJSON()).toMatchSnapshot()
  })

  it('can be pressed', () => {
    const onPress = jest.fn()
    const { getByTestId } = render(
      <TrackWithLikes onPress={onPress} track={track} />,
    )
    fireEvent.press(getByTestId('wrapper'))
    expect(onPress).toBeCalled()
  })

  it('can be pressed in playing state', () => {
    const onPress = jest.fn()
    const { getByTestId } = render(
      <TrackWithLikes isPlaying onPress={onPress} track={track} />,
    )
    fireEvent.press(getByTestId('wrapper'))
    expect(onPress).toBeCalled()
  })

  it('can be liked', () => {
    const onPressLike = jest.fn()
    const { getByTestId } = render(
      <TrackWithLikes onPressLike={onPressLike} track={track} />,
    )
    fireEvent.press(getByTestId('like'))
    expect(onPressLike).toBeCalled()
  })

  it('can be unliked', () => {
    const onPressLike = jest.fn()
    const likedTrack = { ...track, isFavorite: true } as Track
    const { getByTestId } = render(
      <TrackWithLikes onPressLike={onPressLike} track={likedTrack} />,
    )
    fireEvent.press(getByTestId('like'))
    expect(onPressLike).toBeCalled()
  })
})
