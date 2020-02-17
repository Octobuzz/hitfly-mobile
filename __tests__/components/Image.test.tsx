import React from 'react'
import { Image, DarkenImage, SvgImage } from 'src/components'
import { render, ReactTestInstanceExtended } from '../../jest/test-utils'

describe('SvgImage', () => {
  it('renders correctly with default_track', () => {
    const uri = 'http://somerul.com/default_track.svg'
    const { container } = render(<SvgImage uri={uri} />)
    expect(container.children[0] as ReactTestInstanceExtended).toMatchSnapshot()
  })
  it('renders correctly with default_profile', () => {
    const uri = 'http://somerul.com/default_profile.svg'
    const { container } = render(<SvgImage uri={uri} />)
    expect(container.children[0] as ReactTestInstanceExtended).toMatchSnapshot()
  })
  it('renders correctly with default_album', () => {
    const uri = 'http://somerul.com/default_album.svg'
    const { container } = render(<SvgImage uri={uri} />)
    expect(container.children[0] as ReactTestInstanceExtended).toMatchSnapshot()
  })
  it('renders correctly with default_musicgroup', () => {
    const uri = 'http://somerul.com/default_musicgroup.svg'
    const { container } = render(<SvgImage uri={uri} />)
    expect(container.children[0] as ReactTestInstanceExtended).toMatchSnapshot()
  })
  it('renders correctly with default_playlist', () => {
    const uri = 'http://somerul.com/default_playlist.svg'
    const { container } = render(<SvgImage uri={uri} />)
    expect(container.children[0] as ReactTestInstanceExtended).toMatchSnapshot()
  })
})

describe('Image', () => {
  it('renders correctly with number source', () => {
    const { container } = render(<Image source={1} />)
    expect(container.children[0] as ReactTestInstanceExtended).toMatchSnapshot()
  })

  it('renders correctly with not svg source', () => {
    const { container } = render(<Image source={{ uri: 'not svg' }} />)
    expect(container.children[0] as ReactTestInstanceExtended).toMatchSnapshot()
  })
})

describe('DarkenImage', () => {
  it('renders correctly', () => {
    const { container } = render(<DarkenImage source={1} />)
    expect(container.children[0] as ReactTestInstanceExtended).toMatchSnapshot()
  })
})
