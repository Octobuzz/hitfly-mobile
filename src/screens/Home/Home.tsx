import React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import { Query } from '@apollo/react-components'
import gql from 'graphql-tag'
import GenresSection from './GenresSection'
import { IGenreItem, SafeView } from 'src/components'
import { serverTransformers } from 'src/utils'

export interface Genre {
  id: number
  name: string
  image: string
}

interface GenreData {
  genre?: Genre[]
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

class Home extends React.Component<NavigationScreenProps> {
  private handlePressGenreItem = (item: IGenreItem) => {}

  render() {
    return (
      <SafeView>
        <Query<GenreData> query={GET_GENRES}>
          {({ loading, data }) => {
            let adaptedGenres
            if (data && data.genre) {
              adaptedGenres = data.genre.map(
                serverTransformers.serverGenreAdapter,
              )
            }
            return (
              <GenresSection
                genres={adaptedGenres}
                isLoading={loading}
                onPressItem={this.handlePressGenreItem}
              />
            )
          }}
        </Query>
      </SafeView>
    )
  }
}

export default Home
