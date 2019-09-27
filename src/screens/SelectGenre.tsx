import L from 'lodash'
import React from 'react'
import { FlatList } from 'react-native'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { Query } from '@apollo/react-components'
import gql from 'graphql-tag'
import {
  View,
  Link,
  Loader,
  Button,
  SafeView,
  GenreItem,
  HelperText,
} from 'src/components'
import { ROUTES } from 'src/navigation'
import { Genre } from 'src/apollo'
import styled from 'src/styled-components'

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

class SelectGenre extends React.Component<NavigationStackScreenProps, State> {
  state: State = {
    selectedGenres: {},
  }
  private navigateToMain = (): void => {
    const { navigation } = this.props
    navigation.navigate(ROUTES.APP.MAIN)
  }

  private renderGenre = ({ item }: { item: Genre }): JSX.Element => {
    const { selectedGenres } = this.state
    const isSelected = selectedGenres[item.id]
    return (
      <GenreItem
        isSelectable
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
      <SafeView>
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
      </SafeView>
    )
  }
}

export default SelectGenre
