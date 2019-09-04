import R from 'ramda'
import React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import { Query } from '@apollo/react-components'
import gql from 'graphql-tag'
import GenresSection from './GenresSection'
import Top50Section from './Top50Section'
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

const GET_TOP50 = gql`
  query {
    GetTopFifty(limit: 50, page: 0) {
      data {
        trackLength: length
      }
    }
  }
`

class Home extends React.Component<NavigationScreenProps> {
  private handlePressGenreItem = (item: IGenreItem) => {}

  private handlePressTop50 = () => {}

  render() {
    return (
      <SafeView>
        <Query<GenreData> query={GET_TOP50}>
          {({ loading, data }) => {
            const playlist = R.path(['GetTopFifty', 'data'], data)
            // if (!loading && !playlist) {
            //   return null
            // }
            return (
              <Top50Section
                // @ts-ignore
                playlist={playlist}
                isLoading={loading}
                onPress={this.handlePressTop50}
              />
            )
          }}
        </Query>
        <Query<GenreData> query={GET_GENRES}>
          {({ loading, data }) => {
            if (!loading && !data) {
              return null
            }
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
