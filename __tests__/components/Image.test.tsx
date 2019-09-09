import React from 'react'
import { Image } from 'src/components'
import renderer from 'react-test-renderer'

describe('Image', () => {
  it('renders correctly with number source', () => {
    const tree = renderer.create(<Image source={1} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders correctly with not svg source', () => {
    const tree = renderer.create(<Image source={{ uri: 'not svg' }} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
