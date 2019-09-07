import React from 'react'
import TextBase from '../TextBase'
import { ThemeProvider } from 'src/styled-components'
import renderer from 'react-test-renderer'
import theme from 'src/theme'

test('renders correctly', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={theme}>
        <TextBase>test text</TextBase>
      </ThemeProvider>,
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
