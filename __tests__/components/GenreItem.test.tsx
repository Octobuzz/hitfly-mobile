import React from 'react'
import { GenreItem, SelectableGenreItem } from 'src/components'
import { Genre } from 'src/apollo'
import { ThemeProvider } from 'src/styled-components'
import { render } from '../../jest/test-utils'
import theme from 'src/theme'

describe('SelectableGenreItem', () => {
  const item = { title: 'title', imageUrl: 'url' } as Genre
  const props = {
    item,
    onPress: jest.fn(),
  }
  it('renders correctly', () => {
    const { asJSON } = render(
      <ThemeProvider theme={theme}>
        <SelectableGenreItem {...props} />
      </ThemeProvider>,
    )

    expect(asJSON()).toMatchSnapshot()
  })

  it('renders correctly in selected state', () => {
    const { asJSON } = render(
      <ThemeProvider theme={theme}>
        <SelectableGenreItem isSelected {...props} />
      </ThemeProvider>,
    )

    expect(asJSON()).toMatchSnapshot()
  })

  it('renders correctly in unselected state', () => {
    const { asJSON } = render(
      <ThemeProvider theme={theme}>
        <SelectableGenreItem isSelected={false} {...props} />
      </ThemeProvider>,
    )

    expect(asJSON()).toMatchSnapshot()
  })
})

describe('GenreItem', () => {
  const item = { title: 'title', imageUrl: 'url' } as Genre
  const props = {
    item,
    onPress: jest.fn(),
  }
  it('renders correctly', () => {
    const { asJSON } = render(
      <ThemeProvider theme={theme}>
        <GenreItem {...props} />
      </ThemeProvider>,
    )

    expect(asJSON()).toMatchSnapshot()
  })
})
