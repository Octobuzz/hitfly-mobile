import L from 'lodash'
import LFP from 'lodash/fp'
import React from 'react'
import { FlatList, Modal } from 'react-native'
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
import SubGenres from './SubGenres'
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
  isEditMode?: boolean
  isSubGenresLoading: boolean
  isUpdating: boolean
  genres: Genre[]
  subGenres: Genre[]
  favouriteGenres?: Genre[]
  onSelectGenreWithSubGenres: (genre: Genre) => void
  onRefresh: () => void
  onEndReached: () => void
  refetchSubGenres: () => void
  onSkip?: () => void
  onSubmit: (genresIds: string[]) => Promise<void>
}

interface State {
  isModalVisible: boolean
  selectedGenre?: Genre
  selectedGenres: Record<number, boolean>
}

class SelectGenre extends React.Component<Props, State> {
  state: State = {
    isModalVisible: false,
    selectedGenres: {},
  }

  componentDidMount() {
    this.initSelectedGenres()
  }

  private initSelectedGenres = (): void => {
    const { favouriteGenres } = this.props
    if (favouriteGenres && favouriteGenres.length) {
      const selectedGenres: Record<number, boolean> = {}
      favouriteGenres.forEach(({ id }) => {
        selectedGenres[id] = true
      })
      this.setState({ selectedGenres })
    }
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
    if (selectedGenres[genre.id]) {
      this.deselectGenre(genre)
    } else {
      this.selectGenre(genre)
    }
  }

  private deselectGenre = (genre: Genre): void => {
    const { selectedGenres } = this.state
    const newGenres = LFP.unset(genre.id, selectedGenres)
    this.setState({ selectedGenres: newGenres })
  }

  private selectGenre = (genre: Genre): void => {
    const { selectedGenres } = this.state
    const newGenres = LFP.set(genre.id, true, selectedGenres)
    this.setState({ selectedGenres: newGenres })
    if (genre.hasSubGenres) {
      const { onSelectGenreWithSubGenres } = this.props
      onSelectGenreWithSubGenres(genre)
      this.setState({
        isModalVisible: true,
        selectedGenre: genre,
      })
    }
  }

  private selectSubGenres = (subGenres: Record<number, boolean>): void => {
    const { selectedGenres } = this.state
    const newSelectedGenres = { ...selectedGenres, ...subGenres }
    this.setState({ isModalVisible: false, selectedGenres: newSelectedGenres })
  }

  private submit = () => {
    const { onSubmit } = this.props
    const { selectedGenres } = this.state
    const allGenres: string[] = []
    for (const genreId in selectedGenres) {
      if (selectedGenres[genreId]) {
        allGenres.push(genreId)
      }
    }
    onSubmit(allGenres)
  }

  private hideModal = () => {
    this.setState({
      isModalVisible: false,
    })
  }

  render() {
    const {
      genres,
      onSkip,
      onRefresh,
      subGenres,
      isLoading,
      isUpdating,
      isEditMode,
      onEndReached,
      refetchSubGenres,
      isSubGenresLoading,
    } = this.props
    const { isModalVisible, selectedGenre, selectedGenres } = this.state
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
          <IndentedButton
            isDisabled={L.isEmpty(selectedGenres) || isUpdating}
            isLoading={isUpdating}
            onPress={this.submit}
            title="Готово"
          />
          {!isEditMode && <Link onPress={onSkip} title="Пропустить" />}
        </View>
        <Modal
          hardwareAccelerated
          transparent
          animationType="fade"
          onRequestClose={this.hideModal}
          visible={isModalVisible}
        >
          <SubGenres
            onRefresh={refetchSubGenres}
            isLoading={isSubGenresLoading}
            onClose={this.hideModal}
            mainGenre={selectedGenre!}
            subGenres={subGenres}
            isEditMode={isEditMode}
            allSelectedGenres={selectedGenres}
            onSubmit={this.selectSubGenres}
          />
        </Modal>
      </SafeView>
    )
  }
}

export default SelectGenre
