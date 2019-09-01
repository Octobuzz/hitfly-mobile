import R from 'ramda'
import React from 'react'
import { FlatList } from 'react-native'
import { View, Loader, GenreItem, IGenreItem } from 'src/components'
import styled from 'src/styled-components'
import SectionHeader from './SectionHeader'

const Wrapper = styled.View``

const DIVIDER_SIZE = 8

const Divider = styled.View`
  width: ${DIVIDER_SIZE}px;
`

const ScrollWrapper = styled.View`
  height: ${GenreItem.size * 2 + DIVIDER_SIZE}px;
`

const Scroll = styled(FlatList as new () => FlatList<GenrePair>).attrs(() => ({
  horizontal: true,
}))`
  margin-bottom: 40px;
`

const Column = styled.View`
  flex: 1;
  justify-content: space-around;
`

type GenrePair = [IGenreItem, IGenreItem?]

interface Props {
  isLoading?: boolean
  genres?: IGenreItem[]
  onPressItem: (item: IGenreItem) => void
}

class GenresSection extends React.Component<Props> {
  // TODO: мемоизация
  private getPairedGenres = (): GenrePair[] | void => {
    const { genres } = this.props
    if (genres) {
      const pairedGenres = R.splitEvery(2, genres) as GenrePair[]
      return pairedGenres
    }
  }

  private keyExtractor = (item: GenrePair): string => item[0].id.toString()

  private renderGenre = ({ item }: { item: GenrePair }): JSX.Element => {
    const { onPressItem } = this.props
    const [genre1, genre2] = item
    return (
      <Column>
        <GenreItem onPress={onPressItem} item={genre1} />
        {genre2 && <GenreItem onPress={onPressItem} item={genre2} />}
      </Column>
    )
  }

  render() {
    const { isLoading } = this.props
    const pairedGenres = this.getPairedGenres()
    return (
      <Wrapper>
        <SectionHeader title="Жанры" />
        <ScrollWrapper>
          {isLoading && <Loader isFilled />}
          {pairedGenres && (
            <Scroll
              ItemSeparatorComponent={Divider}
              renderItem={this.renderGenre}
              keyExtractor={this.keyExtractor}
              data={pairedGenres}
            />
          )}
        </ScrollWrapper>
      </Wrapper>
    )
  }
}

export default GenresSection
