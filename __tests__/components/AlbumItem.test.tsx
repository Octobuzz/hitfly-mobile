import React from 'react'
import { render } from '@testing-library/react-native'
import AlbumItem from 'src/components/AlbumItem'
import { Album } from 'src/apollo'
import { ThemeProvider } from 'src/styled-components'
import theme from 'src/theme'

describe('AlbumItem', () => {
  const item = {
    title: 'title',
    cover: [{ imageUrl: 'url' }],
    author: 'author',
  } as Album

  const props = {
    item,
    onPress: jest.fn,
  }

  it('it renders correctly', () => {
    const { asJSON } = render(
      <ThemeProvider theme={theme}>
        <AlbumItem {...props} />
      </ThemeProvider>,
    )

    expect(asJSON()).toMatchSnapshot()
  })
})
