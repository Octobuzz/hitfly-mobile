import L from 'lodash'
import React from 'react'
import { FlatList } from 'react-native'
import {
  View,
  Link,
  Loader,
  Button,
  SafeView,
  HelperText,
  RefreshControl,
  SelectableGenreItem,
} from 'src/components'
import { Genre } from 'src/apollo'
import { styles } from 'src/constants'
import styled from 'src/styled-components'

const IndentedButton = styled(Button)`
  margin-bottom: 24px;
`

// https://dev.to/acro5piano/use-styled-components-reactnative-s-flatlist-in-typescript-308e
const Scroll = styled(FlatList as new () => FlatList<Genre>).attrs(() => ({
  numColumns: 3,
  initialNumToRender: 12,
  columnWrapperStyle: {
    justifyContent: 'space-between',
    marginBottom: styles.VIEW_HORIZONTAL_INDENTATION / 2,
  },
  contentContainerStyle: {
    paddingHorizontal: styles.VIEW_HORIZONTAL_INDENTATION,
  },
}))`
  flex: 1;
`

const SizedLoader = <Loader size={100} />

interface Props {
  isLoading: boolean
  genres: Genre[]
  onRefresh: () => void
  onEndReached: () => void
  onSkip: () => void
  onSubmit: (genres: Record<number, boolean>) => void
}

interface State {
  selectedGenres: Record<number, boolean>
}

class SelectGenre extends React.Component<Props, State> {
  state: State = {
    selectedGenres: {},
  }

  private renderGenre = ({ item }: { item: Genre }): JSX.Element => {
    const { selectedGenres } = this.state
    const isSelected = selectedGenres[item.id]
    return (
      <SelectableGenreItem
        item={item}
        isSelected={isSelected}
        onPress={this.toggleGenre}
      />
    )
  }

  private toggleGenre = (genre: Genre): void => {
    const { selectedGenres } = this.state
    let newGenres
    if (selectedGenres[genre.id]) {
      newGenres = L.set(selectedGenres, genre.id, false)
    } else {
      newGenres = L.set(selectedGenres, genre.id, true)
    }
    this.setState({ selectedGenres: newGenres })
  }

  private submit = () => {
    const { onSubmit } = this.props
    const { selectedGenres } = this.state
    onSubmit(selectedGenres)
  }

  render() {
    const { onEndReached, isLoading, genres, onSkip, onRefresh } = this.props
    return (
      <SafeView>
        <View noFill paddingVertical={0}>
          <HelperText>
            Отметьте жанры, которые Вам нравятся. Это поможет получать более
            точные и интересные рекомендации
          </HelperText>
        </View>
        <Scroll
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={onRefresh} />
          }
          data={genres}
          renderItem={this.renderGenre}
          onEndReachedThreshold={0.7}
          onEndReached={onEndReached}
          ListFooterComponent={isLoading ? SizedLoader : null}
        />
        <View noFill paddingTop={42}>
          <IndentedButton onPress={this.submit} title="Готово" />
          <Link onPress={onSkip} title="Пропустить" />
        </View>
      </SafeView>
    )
  }
}

export default SelectGenre
