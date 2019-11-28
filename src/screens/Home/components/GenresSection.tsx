import L from 'lodash'
import React from 'react'
import { FlatList } from 'react-native'
import {
  Loader,
  GenreItem,
  SectionHeader,
  ListFooterLoader,
} from 'src/components'
import SectionWrapper from './SectionWrapper'
import { Genre } from 'src/apollo'
import styled from 'src/styled-components'

const DIVIDER_SIZE = 8

const ScrollWrapper = styled.View`
  height: ${GenreItem.size * 2 + DIVIDER_SIZE}px;
`

const Scroll = styled(FlatList as new () => FlatList<GenrePair>).attrs(() => ({
  horizontal: true,
  initialNumToRender: 10,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    paddingHorizontal: 12,
  },
}))``

const Column = styled.View`
  flex-grow: 1;
  padding-horizontal: ${DIVIDER_SIZE / 2}px;
  justify-content: space-between;
`

type GenrePair = [Genre, Genre?]

interface Props {
  isLoading?: boolean
  isFetchingMore?: boolean
  genres: Genre[]
  onEndReached: () => void
  onPressItem: (item: Genre) => void
  onPressHeader: () => void
}

class GenresSection extends React.Component<Props> {
  // TODO: мемоизация
  private getPairedGenres = (): GenrePair[] => {
    const { genres } = this.props
    const pairedGenres = L.chunk(genres, 2) as GenrePair[]
    return pairedGenres
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
    const {
      isLoading,
      onEndReached,
      onPressHeader,
      isFetchingMore,
    } = this.props
    const pairedGenres = this.getPairedGenres()
    if (!isLoading && !pairedGenres.length) {
      return null
    }
    return (
      <SectionWrapper>
        <SectionHeader onPress={onPressHeader} title="Жанры" />
        <ScrollWrapper>
          {isLoading ? (
            <Loader isAbsolute />
          ) : (
            <Scroll
              ListFooterComponent={
                <ListFooterLoader isShown={isFetchingMore} />
              }
              onEndReachedThreshold={0.9}
              onEndReached={onEndReached}
              getItemLayout={this.getItemLayout}
              renderItem={this.renderGenre}
              keyExtractor={this.keyExtractor}
              data={pairedGenres}
            />
          )}
        </ScrollWrapper>
      </SectionWrapper>
    )
  }
}

export default GenresSection
