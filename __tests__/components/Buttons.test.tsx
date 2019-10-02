import React from 'react'
import { SocialConnect } from 'src/apollo'
import { Link, Button, SocialButton } from 'src/components'
import { render } from '../../jest/test-utils'
import { ThemeProvider } from 'src/styled-components'
import theme from 'src/theme'

describe('Button', () => {
  it('renders as gradient', () => {
    const { asJSON } = render(
      <ThemeProvider theme={theme}>
        <Button title="title" />
      </ThemeProvider>,
    )
    expect(asJSON()).toMatchSnapshot()
  })

  it('renders as gradient with loader', () => {
    const { asJSON } = render(
      <ThemeProvider theme={theme}>
        <Button isLoading title="title" />
      </ThemeProvider>,
    )
    expect(asJSON()).toMatchSnapshot()
  })

  it('renders as gradient in disabled state', () => {
    const { asJSON } = render(
      <ThemeProvider theme={theme}>
        <Button isDisabled title="title" />
      </ThemeProvider>,
    )
    expect(asJSON()).toMatchSnapshot()
  })

  it('renders as outline', () => {
    const { asJSON } = render(
      <ThemeProvider theme={theme}>
        <Button type="outline" title="title" />
      </ThemeProvider>,
    )
    expect(asJSON()).toMatchSnapshot()
  })

  it('renders as outline-black', () => {
    const { asJSON } = render(
      <ThemeProvider theme={theme}>
        <Button type="outline-black" title="title" />
      </ThemeProvider>,
    )
    expect(asJSON()).toMatchSnapshot()
  })
})

describe('Link', () => {
  it('renders correctly', () => {
    const { asJSON } = render(
      <ThemeProvider theme={theme}>
        <Link title="title" />
      </ThemeProvider>,
    )
    expect(asJSON()).toMatchSnapshot()
  })

  it('renders correctly in disabled state', () => {
    const { asJSON } = render(
      <ThemeProvider theme={theme}>
        <Link isDisabled title="title" />
      </ThemeProvider>,
    )
    expect(asJSON()).toMatchSnapshot()
  })
})

describe('Social Button', () => {
  it('renders correctly as facebook', () => {
    const { asJSON } = render(
      <ThemeProvider theme={theme}>
        <SocialButton
          buttonData={
            { type: 'facebook', url: 'facebook-url' } as SocialConnect
          }
        />
      </ThemeProvider>,
    )
    expect(asJSON()).toMatchSnapshot()
  })
  it('renders correctly as instagram', () => {
    const { asJSON } = render(
      <ThemeProvider theme={theme}>
        <SocialButton
          buttonData={
            { type: 'instagram', url: 'instagram-url' } as SocialConnect
          }
        />
      </ThemeProvider>,
    )
    expect(asJSON()).toMatchSnapshot()
  })
  it('renders correctly as odnoklassniki', () => {
    const { asJSON } = render(
      <ThemeProvider theme={theme}>
        <SocialButton
          buttonData={
            { type: 'odnoklassniki', url: 'odnoklassniki-url' } as SocialConnect
          }
        />
      </ThemeProvider>,
    )
    expect(asJSON()).toMatchSnapshot()
  })
  it('renders correctly as vkontakte', () => {
    const { asJSON } = render(
      <ThemeProvider theme={theme}>
        <SocialButton
          buttonData={
            { type: 'vkontakte', url: 'vkontakte-url' } as SocialConnect
          }
        />
      </ThemeProvider>,
    )
    expect(asJSON()).toMatchSnapshot()
  })
})
