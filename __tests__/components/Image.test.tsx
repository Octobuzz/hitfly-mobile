import React from 'react'
import { Image, DarkenImage, SvgImage } from 'src/components'
import { render } from '../../jest/test-utils'

describe('SvgImage', () => {
  it('renders correctly with default_track', () => {
    const uri = 'http://somerul.com/default_track.svg'
    const { asJSON } = render(<SvgImage uri={uri} />)
    expect(asJSON()).toMatchSnapshot()
  })
  it('renders correctly with default_profile', () => {
    const uri = 'http://somerul.com/default_profile.svg'
    const { asJSON } = render(<SvgImage uri={uri} />)
    expect(asJSON()).toMatchSnapshot()
  })
  it('renders correctly with default_album', () => {
    const uri = 'http://somerul.com/default_album.svg'
    const { asJSON } = render(<SvgImage uri={uri} />)
    expect(asJSON()).toMatchSnapshot()
  })
  it('renders correctly with default_musicgroup', () => {
    const uri = 'http://somerul.com/default_musicgroup.svg'
    const { asJSON } = render(<SvgImage uri={uri} />)
    expect(asJSON()).toMatchSnapshot()
  })
  it('renders correctly with default_playlist', () => {
    const uri = 'http://somerul.com/default_playlist.svg'
    const { asJSON } = render(<SvgImage uri={uri} />)
    expect(asJSON()).toMatchSnapshot()
  })
})

describe('Image', () => {
  it('renders correctly with number source', () => {
    const { asJSON } = render(<Image source={1} />)
    expect(asJSON()).toMatchSnapshot()
  })

  it('renders correctly with not svg source', () => {
    const { asJSON } = render(<Image source={{ uri: 'not svg' }} />)
    expect(asJSON()).toMatchSnapshot()
  })
})

describe('DarkenImage', () => {
  it('renders correctly', () => {
    const { asJSON } = render(<DarkenImage source={1} />)
    expect(asJSON()).toMatchSnapshot()
  })
})
