import React from 'react'
import GenreItem from '../GenreItem'
import { Genre } from 'src/apollo'
import { ThemeProvider } from 'src/styled-components'
import renderer from 'react-test-renderer'
import theme from 'src/theme'

test('renders correctly', () => {
  const item = { title: 'title', imageUrl: 'url' } as Genre
  const tree = renderer
    .create(
      <ThemeProvider theme={theme}>
        <GenreItem item={item} />
      </ThemeProvider>,
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
