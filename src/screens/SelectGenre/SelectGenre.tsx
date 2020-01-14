import L from 'lodash'
import LFP from 'lodash/fp'
import React from 'react'
import { FlatList, Modal } from 'react-native'
import {
  View,
  Link,
  Button,
  SafeView,
  HelperText,
  RefreshControl,
  ListFooterLoader,
  SelectableGenreItem,
} from 'src/components'
import SubGenres from './SubGenresContainer'
import { Genre } from 'src/apollo'
import { styles } from 'src/constants'
import styled from 'src/styled-components'

const IndentedLink = styled(Link)`
  margin-top: 24px;
`

// https://dev.to/acro5piano/use-styled-components-reactnative-s-flatlist-in-typescript-308e
const Scroll = styled(FlatList as new () => FlatList<Genre>).attrs(() => ({
  numColumns: 3,
  initialNumToRender: 12,
  columnWrapperStyle: {
    marginBottom: styles.VIEW_HORIZONTAL_INDENTATION / 2,
  },
  contentContainerStyle: {
    paddingVertical: styles.VIEW_VERTICAL_INDENTATION,
    paddingHorizontal: (styles.VIEW_HORIZONTAL_INDENTATION / 4) * 3,
  },
}))`
  flex: 1;
`

const Col = styled.View`
  padding-horizontal: ${styles.VIEW_HORIZONTAL_INDENTATION / 4};
`

interface Props {
  isLoading: boolean
  isRefreshing: boolean
  isEditMode?: boolean
  isUpdating: boolean
  genres: Genre[]
  favouriteGenres: Genre[]
  onRefresh: () => void
  onEndReached: () => void
  onSkip: () => void
  onSubmit: (genresIds: string[]) => Promise<void>
}

interface State {
  isModalVisible: boolean
  selectAllSubGenres: boolean
  selectedGenre?: Genre
  selectedGenres: Record<number, boolean>
}

class SelectGenre extends React.Component<Props, State> {
  state: State = {
    isModalVisible: false,
    selectAllSubGenres: false,
    selectedGenres: {},
  }

  static defaultProps = {
    favouriteGenres: [],
  }

  componentDidMount() {
    this.initSelectedGenres()
  }

  private initSelectedGenres = (): void => {
    const { favouriteGenres } = this.props
    if (favouriteGenres.length) {
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
      <Col>
        <SelectableGenreItem
          item={item}
          isSelected={isSelected}
          onPress={this.toggleGenre}
          onPressSubGenres={this.showSubGenres}
        />
      </Col>
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

  private showSubGenres = (genre: Genre): void => {
    this.setState({
      isModalVisible: true,
      selectAllSubGenres: false,
      selectedGenre: genre,
    })
  }

  private deselectGenre = (genre: Genre): void => {
    const { selectedGenres } = this.state
    const newGenres = LFP.unset(genre.id, selectedGenres)
    this.setState({ selectedGenres: newGenres })
  }

  private selectGenre = (genre: Genre): void => {
    const { selectedGenres } = this.state
    const newGenres = LFP.set(genre.id, true, selectedGenres)
    if (genre.hasSubGenres) {
      this.setState({
        selectAllSubGenres: true,
        selectedGenres: newGenres,
        isModalVisible: true,
        selectedGenre: genre,
      })
    } else {
      this.setState({ selectedGenres: newGenres })
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
      isLoading,
      isEditMode,
      isUpdating,
      onEndReached,
      isRefreshing,
    } = this.props
    const {
      isModalVisible,
      selectedGenre,
      selectedGenres,
      selectAllSubGenres,
    } = this.state
    return (
      <SafeView>
        <Scroll
          ListHeaderComponent={
            <HelperText>
              Отметьте жанры, которые Вам нравятся. Это поможет получать более
              точные и интересные рекомендации
            </HelperText>
          }
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
          data={genres}
          renderItem={this.renderGenre}
          onEndReachedThreshold={0.7}
          onEndReached={onEndReached}
          ListFooterComponent={<ListFooterLoader isShown={isLoading} />}
        />
        <View noFill paddingTop={42}>
          <Button
            isDisabled={L.isEmpty(selectedGenres) || isUpdating}
            isLoading={isUpdating}
            onPress={this.submit}
            title="Готово"
          />
          {!isEditMode && (
            <IndentedLink
              isDisabled={isUpdating}
              onPress={onSkip}
              title="Пропустить"
            />
          )}
        </View>
        <Modal
          hardwareAccelerated
          transparent
          animationType="fade"
          onRequestClose={this.hideModal}
          visible={isModalVisible}
        >
          <SubGenres
            mainGenre={selectedGenre!}
            selectAllSubGenres={selectAllSubGenres}
            allSelectedGenres={selectedGenres}
            onClose={this.hideModal}
            onSubmit={this.selectSubGenres}
          />
        </Modal>
      </SafeView>
    )
  }
}

export default SelectGenre
