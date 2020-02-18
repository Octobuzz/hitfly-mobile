import React from 'react'
import { render, ReactTestInstanceExtended } from '../../jest/test-utils'
import { ScrollView } from 'src/components/views'

describe('ScrollView', () => {
  const props = {
    paddingTop: 10,
    paddingBottom: 20,
    paddingVertical: 40,
    paddingHorizontal: 10,
  }

  it('renders correctly', () => {
    const { container } = render(<ScrollView />)
    expect(container.children[0] as ReactTestInstanceExtended).toMatchSnapshot()
  })

  it('renders with noFill === false and noPadding === false', () => {
    const { container } = render(
      <ScrollView noFill={false} noPadding={false} {...props} />,
    )
    expect(container.children[0] as ReactTestInstanceExtended).toMatchSnapshot()
  })
  it('renders with noFill === true and noPadding === true', () => {
    const { container } = render(<ScrollView noFill noPadding {...props} />)
    expect(container.children[0] as ReactTestInstanceExtended).toMatchSnapshot()
  })
  it('renders with no vertical and horizontal padding', () => {
    const { container } = render(
      <ScrollView
        noVerticalPadding={false}
        noHorizontalPadding={false}
        {...props}
      />,
    )
    expect(container.children[0] as ReactTestInstanceExtended).toMatchSnapshot()
  })
  it('renders with vertical and horizontal padding', () => {
    const { container } = render(
      <ScrollView noVerticalPadding noHorizontalPadding {...props} />,
    )
    expect(container.children[0] as ReactTestInstanceExtended).toMatchSnapshot()
  })
  it('renders with addBottomSafePadding === false', () => {
    const { container } = render(
      <ScrollView addBottomSafePadding={false} {...props} />,
    )
    expect(container.children[0] as ReactTestInstanceExtended).toMatchSnapshot()
  })
  it('renders with addBottomSafePadding === true', () => {
    const { container } = render(<ScrollView addBottomSafePadding {...props} />)
    expect(container.children[0] as ReactTestInstanceExtended).toMatchSnapshot()
  })
})
