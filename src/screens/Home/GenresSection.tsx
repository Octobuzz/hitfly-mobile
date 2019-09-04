import L from 'lodash'
import React from 'react'
import { FlatList } from 'react-native'
import { Loader, GenreItem } from 'src/components'
import SectionHeader from './SectionHeader'
import { Genre } from 'src/apollo'
import styled from 'src/styled-components'

const Wrapper = styled.View``

const DIVIDER_SIZE = 8

const ScrollWrapper = styled.View`
  height: ${GenreItem.size * 2 + DIVIDER_SIZE}px;
`

const Scroll = styled(FlatList as new () => FlatList<GenrePair>).attrs(() => ({
  horizontal: true,
  initialNumToRender: 5,
  contentInset: { left: 12, right: 12 },
  contentOffset: { x: -12, y: 0 },
  showsHorizontalScrollIndicator: false,
}))``

const Column = styled.View`
  flex: 1;
  padding-horizontal: ${DIVIDER_SIZE / 2}px;
  justify-content: space-between;
`

type GenrePair = [Genre, Genre?]

interface Props {
  isLoading?: boolean
  genres?: Genre[]
  onPressItem: (item: Genre) => void
}

class GenresSection extends React.Component<Props> {
  // TODO: мемоизация
  private getPairedGenres = (): GenrePair[] | void => {
    const { genres } = this.props
    if (genres) {
      const pairedGenres = L.chunk(genres, 2) as GenrePair[]
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

  private getItemLayout = (
    _: any,
    index: number,
  ): { length: number; offset: number; index: number } => {
    const length = GenreItem.size + DIVIDER_SIZE
    return {
      length,
      offset: length * index,
      index,
    }
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
              getItemLayout={this.getItemLayout}
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
