import React from 'react'
import { GenreItem } from 'src/components'
import { Genre } from 'src/apollo'
import { ThemeProvider } from 'src/styled-components'
import { render } from '../../jest/test-utils'
import theme from 'src/theme'

describe('GenreItem', () => {
  const item = { title: 'title', imageUrl: 'url' } as Genre

  it('renders correctly', () => {
    const { asJSON } = render(
      <ThemeProvider theme={theme}>
        <GenreItem item={item} />
      </ThemeProvider>,
    )

    expect(asJSON()).toMatchSnapshot()
  })

  it('renders correctly in selected state', () => {
    const { asJSON } = render(
      <ThemeProvider theme={theme}>
        <GenreItem isSelectable isSelected item={item} />
      </ThemeProvider>,
    )

    expect(asJSON()).toMatchSnapshot()
  })

  it('renders correctly in unselected state', () => {
    const { asJSON } = render(
      <ThemeProvider theme={theme}>
        <GenreItem isSelectable isSelected={false} item={item} />
      </ThemeProvider>,
    )

    expect(asJSON()).toMatchSnapshot()
  })
})
