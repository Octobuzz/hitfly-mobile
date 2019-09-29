import React from 'react'
import { Loader } from 'src/components'
import { render } from '../../jest/test-utils'

describe('Loader', () => {
  it('renders correctly', () => {
    const { asJSON } = render(<Loader />)
    expect(asJSON()).toMatchSnapshot()
  })

  it('renders correctly in absolute state', () => {
    const { asJSON } = render(<Loader isAbsolute />)
    expect(asJSON()).toMatchSnapshot()
  })

  it('renders correctly in filled state', () => {
    const { asJSON } = render(<Loader isFilled />)
    expect(asJSON()).toMatchSnapshot()
  })
})
