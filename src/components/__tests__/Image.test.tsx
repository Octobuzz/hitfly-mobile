import React from 'react'
import Image from '../Image'
import renderer from 'react-test-renderer'

test('renders correctly with number source', () => {
  const tree = renderer.create(<Image source={1} />).toJSON()
  expect(tree).toMatchSnapshot()
})

test('renders correctly with not svg source', () => {
  const tree = renderer.create(<Image source={{ uri: 'not svg' }} />).toJSON()
  expect(tree).toMatchSnapshot()
})
