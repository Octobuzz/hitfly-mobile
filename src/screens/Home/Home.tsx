import L from 'lodash'
import React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import { Query } from '@apollo/react-components'
import gql from 'graphql-tag'
import RecommendedSection from './RecommendedSection'
import GenresSection from './GenresSection'
import Top50Section from './Top50Section'
import NewSection from './NewSection'
import { SafeView } from 'src/components'
import { Genre, Playlist, Pagination, Collection, Track } from 'src/apollo'
import styled from 'src/styled-components'

const Container = styled.ScrollView.attrs(() => ({
  showsVerticalScrollIndicator: false,
}))`
  padding-top: 24px;
  flex: 1;
`

interface GenreData {
  genres?: Genre[]
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

interface Top50Data {
  top50?: Pagination<Playlist>
}
const GET_TOP50 = gql`
  query {
    top50: GetTopFifty(limit: 50, page: 0) {
      items: data {
        length
      }
    }
  }
`

interface RecommendedData {
  collections?: Pagination<Collection>
}
const GET_RECOMMENDED = gql`
  query {
    collections(limit: 10, page: 1, filters: { collection: true }) {
      items: data {
        id
        images: image(sizes: [size_290x290]) {
          imageUrl: url
        }
        title
        tracksCountInPlaylist: tracksCount
      }
    }
  }
`

interface NewTracksData {
  tracks?: Pagination<Track>
}
const GET_NEW_TRACKS = gql`
  query {
    tracks(limit: 10, page: 0) {
      items: data {
        id
        title: trackName
        cover(sizes: [size_290x290]) {
          imageUrl: url
        }
        group: musicGroup {
          title: name
        }
        singer
      }
    }
  }
`

class Home extends React.Component<NavigationScreenProps> {
  private handlePressGenreItem = (item: Genre) => {}

  private handlePressTop50 = (playlist: Playlist) => {}

  private handlePressRecommendedHeader = () => {}
  private handlePressRecommendedCollection = (collection: Collection) => {}

  private handlePressNewSectionHeader = () => {}
  private handlePressNewTrack = (track: Track) => {}

  render() {
    return (
      <SafeView>
        <Container>
          <Query<RecommendedData> query={GET_RECOMMENDED}>
            {({ loading, data }) => {
              const collections = L.get(data, 'collections.items')
              if (!loading && !collections) {
                return null
              }
              return (
                <RecommendedSection
                  collections={collections}
                  isLoading={loading}
                  onPressHeader={this.handlePressRecommendedHeader}
                  onPressCollection={this.handlePressRecommendedCollection}
                />
              )
            }}
          </Query>
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
          <Query<NewTracksData> query={GET_NEW_TRACKS}>
            {({ loading, data }) => {
              const playlist = L.get(data, 'tracks.items')
              if (!loading && !playlist) {
                return null
              }
              return (
                <NewSection
                  playlist={playlist}
                  isLoading={loading}
                  onPressTrack={this.handlePressNewTrack}
                  onPressHeader={this.handlePressNewSectionHeader}
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
