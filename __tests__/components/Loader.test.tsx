import React from 'react'
import { Loader, ListFooterLoader } from 'src/components'
import { render, ReactTestInstanceExtended } from '../../jest/test-utils'

describe('Loader', () => {
  it('renders correctly', () => {
    const { container } = render(<Loader />)
    expect(container.children[0] as ReactTestInstanceExtended).toMatchSnapshot()
  })

  it('renders correctly in absolute state', () => {
    const { container } = render(<Loader isAbsolute />)
    expect(container.children[0] as ReactTestInstanceExtended).toMatchSnapshot()
  })

  it('renders correctly in filled state', () => {
    const { container } = render(<Loader isFilled />)
    expect(container.children[0] as ReactTestInstanceExtended).toMatchSnapshot()
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
