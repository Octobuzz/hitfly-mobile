import React from 'react'
import { render, fireEvent } from '../../jest/test-utils'
import {
  GenreItem,
  SelectableGenreItem,
  GenreItemProps,
  SelectableGenreItemProps,
} from 'src/components'
import { Genre } from 'src/apollo'

describe('SelectableGenreItem', () => {
  it('renders correctly', () => {
    const item = { title: 'title', imageUrl: 'url' } as Genre
    const props: SelectableGenreItemProps = {
      item,
    }
    const { asJSON } = render(<SelectableGenreItem {...props} />)

    expect(asJSON()).toMatchSnapshot()
  })

  it('renders correctly in selected state', () => {
    const item = { title: 'title', imageUrl: 'url' } as Genre
    const props: SelectableGenreItemProps = {
      item,
    }
    const { asJSON } = render(<SelectableGenreItem isSelected {...props} />)

    expect(asJSON()).toMatchSnapshot()
  })

  it('renders correctly with subgenres', () => {
    const item = {
      title: 'title',
      imageUrl: 'url',
      hasSubGenres: true,
    } as Genre
    const props: SelectableGenreItemProps = {
      item,
    }
    const { asJSON } = render(<SelectableGenreItem isSelected {...props} />)
    expect(asJSON()).toMatchSnapshot()
  })

  it('can be pressed on the wrapper and the child', () => {
    const item = {
      title: 'title',
      imageUrl: 'url',
      hasSubGenres: true,
    } as Genre
    const props: SelectableGenreItemProps = {
      item,
      onPress: jest.fn(),
      onPressSubGenres: jest.fn(),
    }
    const { getByTestId } = render(
      <SelectableGenreItem isSelected {...props} />,
    )
    fireEvent.press(getByTestId('wrapper'))
    fireEvent.press(getByTestId('optionalChild'))

    expect(props.onPress).toBeCalled()
    expect(props.onPressSubGenres).toBeCalled()
  })
})

describe('GenreItem', () => {
  const item = { title: 'title', imageUrl: 'url' } as Genre

  it('renders correctly', () => {
    const props: GenreItemProps = {
      item,
      onPress: jest.fn(),
    }
    const { asJSON } = render(<GenreItem {...props} />)

    expect(asJSON()).toMatchSnapshot()
  })
  it('disabled without onPress', () => {
    const props: GenreItemProps = {
      item,
    }
    const { asJSON } = render(<GenreItem {...props} />)

    expect(asJSON()).toMatchSnapshot()
  })

  it('can be pressed', () => {
    const props: GenreItemProps = {
      item,
      onPress: jest.fn(),
    }
    const { getByTestId } = render(<GenreItem {...props} />)
    fireEvent.press(getByTestId('wrapper'))
    expect(props.onPress).toBeCalled()
  })
})
