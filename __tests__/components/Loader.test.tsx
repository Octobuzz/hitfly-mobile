import React from 'react'
import { Loader, ListFooterLoader } from 'src/components'
import { render, ReactTestInstanceExtended } from '../../jest/test-utils'

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

describe('ListFooterLoader', () => {
  it('shows loader', () => {
    const { getByTestId } = render(<ListFooterLoader isShown />)
    expect(getByTestId('loader')).toBeTruthy()
  })

  it('renders null', () => {
    const { container } = render(<ListFooterLoader />)
    expect(container.children[0] as ReactTestInstanceExtended).toBeFalsy()
  })
})
