import React from 'react'
import { SocialConnect } from 'src/apollo'
import { Link, Button, SocialButton } from 'src/components'
import { render } from '../../jest/test-utils'

describe('Button', () => {
  it('renders as gradient', () => {
    const { asJSON } = render(<Button title="title" />)
    expect(asJSON()).toMatchSnapshot()
  })

  it('renders as gradient with loader', () => {
    const { asJSON } = render(<Button isLoading title="title" />)
    expect(asJSON()).toMatchSnapshot()
  })

  it('renders as gradient in disabled state', () => {
    const { asJSON } = render(<Button isDisabled title="title" />)
    expect(asJSON()).toMatchSnapshot()
  })

  it('renders as outline', () => {
    const { asJSON } = render(<Button type="outline" title="title" />)
    expect(asJSON()).toMatchSnapshot()
  })

  it('renders as outline-black', () => {
    const { asJSON } = render(<Button type="outline-black" title="title" />)
    expect(asJSON()).toMatchSnapshot()
  })
})

describe('Link', () => {
  it('renders correctly', () => {
    const { asJSON } = render(<Link title="title" />)
    expect(asJSON()).toMatchSnapshot()
  })

  it('renders correctly in disabled state', () => {
    const { asJSON } = render(<Link isDisabled title="title" />)
    expect(asJSON()).toMatchSnapshot()
  })
})

describe('Social Button', () => {
  it('renders correctly as facebook', () => {
    const { asJSON } = render(
      <SocialButton
        buttonData={{ type: 'facebook', url: 'facebook-url' } as SocialConnect}
      />,
    )
    expect(asJSON()).toMatchSnapshot()
  })
  it('renders correctly as instagram', () => {
    const { asJSON } = render(
      <SocialButton
        buttonData={
          { type: 'instagram', url: 'instagram-url' } as SocialConnect
        }
      />,
    )
    expect(asJSON()).toMatchSnapshot()
  })
  it('renders correctly as odnoklassniki', () => {
    const { asJSON } = render(
      <SocialButton
        buttonData={
          { type: 'odnoklassniki', url: 'odnoklassniki-url' } as SocialConnect
        }
      />,
    )
    expect(asJSON()).toMatchSnapshot()
  })
  it('renders correctly as vkontakte', () => {
    const { asJSON } = render(
      <SocialButton
        buttonData={
          { type: 'vkontakte', url: 'vkontakte-url' } as SocialConnect
        }
      />,
    )
    expect(asJSON()).toMatchSnapshot()
  })
})
