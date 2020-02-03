import React from 'react'
import { render } from '../../jest/test-utils'
import { ScrollView } from 'src/components/views'

describe('ScrollView', () => {
  const props = {
    paddingTop: 10,
    paddingBottom: 20,
    paddingVertical: 40,
    paddingHorizontal: 10,
  }

  it('renders correctly', () => {
    const { asJSON } = render(<ScrollView />)
    expect(asJSON()).toMatchSnapshot()
  })

  it('renders with noFill === false and noPadding === false', () => {
    const { asJSON } = render(
      <ScrollView noFill={false} noPadding={false} {...props} />,
    )
    expect(asJSON()).toMatchSnapshot()
  })
  it('renders with noFill === true and noPadding === true', () => {
    const { asJSON } = render(<ScrollView noFill noPadding {...props} />)
    expect(asJSON()).toMatchSnapshot()
  })
  it('renders with no vertical and horizontal padding', () => {
    const { asJSON } = render(
      <ScrollView
        noVerticalPadding={false}
        noHorizontalPadding={false}
        {...props}
      />,
    )
    expect(asJSON()).toMatchSnapshot()
  })
  it('renders with vertical and horizontal padding', () => {
    const { asJSON } = render(
      <ScrollView noVerticalPadding noHorizontalPadding {...props} />,
    )
    expect(asJSON()).toMatchSnapshot()
  })
  it('renders with addBottomSafePadding === false', () => {
    const { asJSON } = render(
      <ScrollView addBottomSafePadding={false} {...props} />,
    )
    expect(asJSON()).toMatchSnapshot()
  })
  it('renders with addBottomSafePadding === true', () => {
    const { asJSON } = render(<ScrollView addBottomSafePadding {...props} />)
    expect(asJSON()).toMatchSnapshot()
  })
})
