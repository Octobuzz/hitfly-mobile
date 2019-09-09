import React from 'react'
import { TextBase, HelperText } from 'src/components'
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
})
