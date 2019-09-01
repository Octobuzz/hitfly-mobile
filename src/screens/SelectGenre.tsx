import R from 'ramda'
import React from 'react'
import { FlatList } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { Query } from '@apollo/react-components'
import { gql } from 'apollo-boost'
import {
  View,
  Link,
  Loader,
  Button,
  GenreItem,
  HelperText,
  IGenreItem,
} from 'src/components'
import { ROUTES } from 'src/navigation'
import styled from 'src/styled-components'

const Container = styled.SafeAreaView`
  flex: 1;
`

const IndentedButton = styled(Button)`
  margin-bottom: 24px;
`

// https://dev.to/acro5piano/use-styled-components-reactnative-s-flatlist-in-typescript-308e
const Scroll = styled(FlatList as new () => FlatList<Genre>).attrs(() => ({
  numColumns: 3,
  initialNumToRender: 12,
  columnWrapperStyle: {
    justifyContent: 'space-around',
    marginBottom: 8,
  },
}))`
  flex: 1;
  margin-bottom: 40px;
`

interface Genre {
  id: number
  name: string
  image: string
}

interface GenreData {
  genre: Genre[]
}

interface State {
  selectedGenres: {
    [id: number]: boolean | undefined
  }
}

const GET_GENRES = gql`
  {
    genre {
      id
      name
      image
    }
  }
`

class SelectGenre extends React.Component<NavigationScreenProps, State> {
  state: State = {
    selectedGenres: {},
  }
  private navigateToMain = (): void => {
    const { navigation } = this.props
    navigation.navigate(ROUTES.APP.MAIN)
  }

  private renderGenre = ({
    item: { image, name, id },
  }: {
    item: Genre
  }): JSX.Element => {
    const { selectedGenres } = this.state
    const isSelected = selectedGenres[id]
    return (
      <GenreItem
        isSelectable
        item={{ imageUrl: image, title: name, id }}
        isSelected={isSelected}
        onPress={this.toggleGenre}
      />
    )
  }

  private toggleGenre = (genre: IGenreItem): void => {
    const { selectedGenres } = this.state
    let newGenres
    if (selectedGenres[genre.id]) {
      newGenres = R.assoc(`${genre.id}`, false, selectedGenres)
    } else {
      newGenres = R.assoc(`${genre.id}`, true, selectedGenres)
    }
    this.setState({ selectedGenres: newGenres })
  }

  private keyExtractor = ({ id }: Genre) => id.toString()

  private getItemLayout = (
    _: any,
    index: number,
  ): { length: number; offset: number; index: number } => ({
    length: GenreItem.size,
    offset: GenreItem.size * index,
    index,
  })

  render() {
    return (
      <Container>
        <View>
          <HelperText>
            Отметьте жанры, которые Вам нравятся. Это поможет получать более
            точные и интересные рекомендации
          </HelperText>
          <Query<GenreData> query={GET_GENRES}>
            {({ data, loading }) => {
              if (loading) {
                return <Loader />
              }
              if (data) {
                return (
                  <Scroll
                    data={data.genre}
                    renderItem={this.renderGenre}
                    keyExtractor={this.keyExtractor}
                    getItemLayout={this.getItemLayout}
                  />
                )
              }
              return null
            }}
          </Query>
          <IndentedButton title="Готово" />
          <Link onPress={this.navigateToMain} title="Пропустить" />
        </View>
      </Container>
    )
  }
}

export default SelectGenre
