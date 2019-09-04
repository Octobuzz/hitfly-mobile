import L from 'lodash'
import React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import { Query } from '@apollo/react-components'
import gql from 'graphql-tag'
import GenresSection from './GenresSection'
import Top50Section from './Top50Section'
import { SafeView } from 'src/components'
import { Genre, Playlist, Pagination } from 'src/apollo'
import styled from 'src/styled-components'

const Container = styled.ScrollView.attrs(() => ({
  showsVerticalScrollIndicator: false,
}))`
  flex: 1;
`

interface GenreData {
  genres?: Genre[]
}

interface Top50Data {
  top50?: Pagination<Playlist>
}

const GET_GENRES = gql`
  {
    genres: genre {
      id
      title: name
      imageUrl: image
    }
  }
`

const GET_TOP50 = gql`
  query {
    top50: GetTopFifty(limit: 50, page: 0) {
      items: data {
        length
      }
    }
  }
`

class Home extends React.Component<NavigationScreenProps> {
  private handlePressGenreItem = (item: Genre) => {}

  private handlePressTop50 = (playlist: Playlist) => {}

  render() {
    return (
      <SafeView>
        <Container>
          <Query<Top50Data> query={GET_TOP50}>
            {({ loading, data }) => {
              const playlist = L.get(data, 'top50.items')
              if (!loading && !playlist) {
                return null
              }
              return (
                <Top50Section
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
        </Container>
      </SafeView>
    )
  }
}

export default Home
