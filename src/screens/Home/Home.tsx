import L from 'lodash'
import React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import { Query } from '@apollo/react-components'
import gql from 'graphql-tag'
import GenresSection from './GenresSection'
import Top50Section from './Top50Section'
import { SafeView } from 'src/components'
import { Genre } from 'src/apollo'

interface GenreData {
  genres?: Genre[]
}

const GET_GENRES = gql`
  {
    genres: genres {
      id
      title: name
      imageUrl: image
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
  private handlePressGenreItem = (item: Genre) => {}

  private handlePressTop50 = () => {}

  render() {
    return (
      <SafeView>
        <Query<GenreData> query={GET_TOP50}>
          {({ loading, data }) => {
            const playlist = L.get(data, ['GetTopFifty', 'data'])
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
            const genres = L.get(data, 'genres')
            if (!loading && !genres) {
              return null
            }
            return (
              <GenresSection
                genres={genres}
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
