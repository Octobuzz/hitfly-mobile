import { render } from '../../jest/test-utils'
import { TrackMenu } from 'src/components'
import React from 'react'
import { Track } from '../../src/apollo'
import { fireEvent } from '@testing-library/react-native'

describe('TrackMenu', () => {
  const track = {
    title: 'title',
    id: 2,
    cover: [{}],
  } as Track

  const props = {
    onPressLike: jest.fn(),
    onPressEdit: jest.fn(),
    onPressCancel: jest.fn(),
    track,
  }

  it('renders correctly', () => {
    const { asJSON } = render(<TrackMenu />)
    expect(asJSON()).toMatchSnapshot()
  })
  it('renders correctly with props', () => {
    const { asJSON, getAllByRole, getByText } = render(<TrackMenu {...props} />)

    fireEvent.press(getAllByRole('summary')[0])
    fireEvent.press(getAllByRole('summary')[1])
    fireEvent.press(getByText('Отмена'))
    expect(asJSON()).toMatchSnapshot()
  })
})
