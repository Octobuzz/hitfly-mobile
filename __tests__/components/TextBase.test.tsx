import React from 'react'
import { TextBase, HelperText, H1, H2 } from 'src/components'
import { render } from '../../jest/test-utils'

describe('Text', () => {
  it('Base renders correctly', () => {
    const { asJSON } = render(<TextBase>test</TextBase>)
    expect(asJSON()).toMatchSnapshot()
  })

  it('Helper renders correctly', () => {
    const { asJSON } = render(<HelperText>test</HelperText>)
    expect(asJSON()).toMatchSnapshot()
  })

  it('H1 renders correctly', () => {
    const { asJSON } = render(<H1>test</H1>)
    expect(asJSON()).toMatchSnapshot()
  })

  it('H2 renders correctly', () => {
    const { asJSON } = render(<H2>test</H2>)
    expect(asJSON()).toMatchSnapshot()
  })
})
