import React from 'react'
import { CollectionItem } from 'src/components'
import { Collection } from 'src/apollo'
import { ThemeProvider } from 'src/styled-components'
import { render } from '../../jest/test-utils'
import theme from 'src/theme'

describe('CollectionItem', () => {
  const item = {
    title: 'title',
    tracksCountInPlaylist: 10,
    image: [{ imageUrl: 'url' }],
  } as Collection

  const props = {
    collection: item,
    onPress: jest.fn,
  }

  it('renders correctly', () => {
    const { asJSON } = render(
      <ThemeProvider theme={theme}>
        <CollectionItem {...props} />
      </ThemeProvider>,
    )

    expect(asJSON()).toMatchSnapshot()
  })

  it('renders correctly with sizes', () => {
    const { asJSON } = render(
      <ThemeProvider theme={theme}>
        <CollectionItem {...props} width={100} height={100} />
      </ThemeProvider>,
    )

    expect(asJSON()).toMatchSnapshot()
  })
})
