import React from 'react'
import {
  render,
  fireEvent,
  ReactTestInstanceExtended,
} from '../../../jest/test-utils'
import { BottomPlayerTrack } from 'src/components'
import { Track } from 'src/apollo'

describe('BottomPlayerTrack', () => {
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
    const { container } = render(<BottomPlayerTrack track={track} />)
    expect(container.children[0] as ReactTestInstanceExtended).toMatchSnapshot()
  })

  it('renders correctly in playing state', () => {
    const { container } = render(<BottomPlayerTrack isPlaying track={track} />)
    expect(container.children[0] as ReactTestInstanceExtended).toMatchSnapshot()
  })

  it('can be pressed', () => {
    const onPress = jest.fn()
    const { getByTestId } = render(
      <BottomPlayerTrack onPress={onPress} track={track} />,
    )
    fireEvent.press(getByTestId('wrapper'))
    expect(onPress).toBeCalled()
  })

  it('can be pressed in playing state', () => {
    const onPress = jest.fn()
    const { getByTestId } = render(
      <BottomPlayerTrack isPlaying onPress={onPress} track={track} />,
    )
    fireEvent.press(getByTestId('wrapper'))
    expect(onPress).toBeCalled()
  })

  it('allows to press control', () => {
    const onPressControl = jest.fn()
    const { getByTestId } = render(
      <BottomPlayerTrack onPressControl={onPressControl} track={track} />,
    )
    fireEvent.press(getByTestId('control'))
    expect(onPressControl).toBeCalled()
  })

  it('allows to press control in playing state', () => {
    const onPressControl = jest.fn()
    const { getByTestId } = render(
      <BottomPlayerTrack
        isPlaying
        onPressControl={onPressControl}
        track={track}
      />,
    )
    fireEvent.press(getByTestId('control'))
    expect(onPressControl).toBeCalled()
  })
})
