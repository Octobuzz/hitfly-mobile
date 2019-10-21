import React from 'react'
import { render } from '@testing-library/react-native'
import AlbumItem from 'src/components/AlbumItem'
import { Album } from 'src/apollo'
import { ThemeProvider } from 'src/styled-components'
import theme from 'src/theme'

describe('AlbumItem', () => {
  it('it renders correctly', () => {
    const item = ({
      cover: [],
      title: 'title',
      group: 'group',
      author: 'author',
    } as unknown) as Album

    const { asJSON } = render(
      <ThemeProvider theme={theme}>
        <AlbumItem item={item} />
      </ThemeProvider>,
    )

    expect(asJSON()).toMatchSnapshot()
  })
})
