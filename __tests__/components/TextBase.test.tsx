import React from 'react'
import { TextBase, HelperText, H1, H2 } from 'src/components'
import { render, ReactTestInstanceExtended } from '../../jest/test-utils'

describe('Text', () => {
  it('Base renders correctly', () => {
    const { container } = render(<TextBase>test</TextBase>)
    expect(container.children[0] as ReactTestInstanceExtended).toMatchSnapshot()
  })

  it('Helper renders correctly', () => {
    const { container } = render(<HelperText>test</HelperText>)
    expect(container.children[0] as ReactTestInstanceExtended).toMatchSnapshot()
  })

  it('H1 renders correctly', () => {
    const { container } = render(<H1>test</H1>)
    expect(container.children[0] as ReactTestInstanceExtended).toMatchSnapshot()
  })

  it('H2 renders correctly', () => {
    const { container } = render(<H2>test</H2>)
    expect(container.children[0] as ReactTestInstanceExtended).toMatchSnapshot()
  })
})
