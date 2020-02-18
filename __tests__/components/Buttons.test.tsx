import React from 'react'
import { SocialConnect } from 'src/apollo'
import { Link, Button, SocialButton } from 'src/components'
import { render, ReactTestInstanceExtended } from '../../jest/test-utils'

describe('Button', () => {
  it('renders as gradient', () => {
    const { container } = render(<Button title="title" />)
    expect(container.children[0] as ReactTestInstanceExtended).toMatchSnapshot()
  })

  it('renders as gradient with loader', () => {
    const { container } = render(<Button isLoading title="title" />)
    expect(container.children[0] as ReactTestInstanceExtended).toMatchSnapshot()
  })

  it('renders as gradient in disabled state', () => {
    const { container } = render(<Button isDisabled title="title" />)
    expect(container.children[0] as ReactTestInstanceExtended).toMatchSnapshot()
  })

  it('renders as outline', () => {
    const { container } = render(<Button type="outline" title="title" />)
    expect(container.children[0] as ReactTestInstanceExtended).toMatchSnapshot()
  })

  it('renders as outline-black', () => {
    const { container } = render(<Button type="outline-black" title="title" />)
    expect(container.children[0] as ReactTestInstanceExtended).toMatchSnapshot()
  })
})

describe('Link', () => {
  it('renders correctly', () => {
    const { container } = render(<Link title="title" />)
    expect(container.children[0] as ReactTestInstanceExtended).toMatchSnapshot()
  })

  it('renders correctly in disabled state', () => {
    const { container } = render(<Link isDisabled title="title" />)
    expect(container.children[0] as ReactTestInstanceExtended).toMatchSnapshot()
  })
})

describe('Social Button', () => {
  it('renders correctly as facebook', () => {
    const { container } = render(
      <SocialButton
        buttonData={{ type: 'facebook', url: 'facebook-url' } as SocialConnect}
      />,
    )
    expect(container.children[0] as ReactTestInstanceExtended).toMatchSnapshot()
  })
  it('renders correctly as instagram', () => {
    const { container } = render(
      <SocialButton
        buttonData={
          { type: 'instagram', url: 'instagram-url' } as SocialConnect
        }
      />,
    )
    expect(container.children[0] as ReactTestInstanceExtended).toMatchSnapshot()
  })
  it('renders correctly as odnoklassniki', () => {
    const { container } = render(
      <SocialButton
        buttonData={
          { type: 'odnoklassniki', url: 'odnoklassniki-url' } as SocialConnect
        }
      />,
    )
    expect(container.children[0] as ReactTestInstanceExtended).toMatchSnapshot()
  })
  it('renders correctly as vkontakte', () => {
    const { container } = render(
      <SocialButton
        buttonData={
          { type: 'vkontakte', url: 'vkontakte-url' } as SocialConnect
        }
      />,
    )
    expect(container.children[0] as ReactTestInstanceExtended).toMatchSnapshot()
  })
})
