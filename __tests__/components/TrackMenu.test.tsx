import { render } from '../../jest/test-utils'
import { TrackMenu } from 'src/components'
import React from 'react'
import { Track } from '../../src/apollo'

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
  it('renders correctly', () => {
    const { asJSON } = render(<TrackMenu track={undefined} />)
    expect(asJSON()).toMatchSnapshot()
  })
  it('renders correctly with handlers', () => {
    const { asJSON } = render(<TrackMenu {...props} />)
    expect(asJSON()).toMatchSnapshot()
  })
})
