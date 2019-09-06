import L from 'lodash'
import React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import { Query } from '@apollo/react-components'
import gql from 'graphql-tag'
import RecommendedSection from './RecommendedSection'
import GenresSection from './GenresSection'
import PlaylistSection from './PlaylistSection'
import TracksSection from './TracksSection'
import { SafeView } from 'src/components'
import { Genre, Playlist, Pagination, Collection, Track } from 'src/apollo'
import { images } from 'src/constants'
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

interface PlaylistData {
  playlist?: Pagination<Playlist>
}
const GET_TOP50 = gql`
  query {
    playlist: GetTopFifty(limit: 50, page: 0) {
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

interface TracksData {
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

const GET_TOP_WEEK_TRACKS = gql`
  query {
    tracks: TopWeeklyQuery(limit: 10, page: 0) {
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

const GET_LISTENED_NOW = gql`
  query {
    playlist: GetTopFifty(limit: 0, page: 0) {
      items: data {
        length
      }
      total
    }
  }
`

class Home extends React.Component<NavigationScreenProps> {
  private handlePressGenreItem = (item: Genre) => {}

  private handlePressTop50 = (playlist: Playlist) => {}

  private handlePressListenedNow = (playlist: Playlist) => {}

  private handlePressRecommendedHeader = () => {}
  private handlePressRecommendedCollection = (collection: Collection) => {}

  private handlePressNewTrack = (track: Track) => {}

  private handlePressTopWeekTrack = (track: Track) => {}

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
          <Query<PlaylistData> query={GET_TOP50}>
            {({ loading, data }) => {
              const playlist = L.get(data, 'playlist.items')
              if (!loading && !playlist) {
                return null
              }
              return (
                <PlaylistSection
                  imageSource={images.TOP50_BACKGROUND}
                  title="Топ 50"
                  subtitle="Рейтинг лучших музыкантов"
                  playlist={playlist}
                  isLoading={loading}
                  bottomTextType="tracksLength"
                  onPress={this.handlePressTop50}
                />
              )
            }}
          </Query>

          <Query<TracksData> query={GET_NEW_TRACKS}>
            {({ loading, data }) => {
              const playlist = L.get(data, 'tracks.items')
              if (!loading && !playlist) {
                return null
              }
              return (
                <TracksSection
                  title="Новое"
                  playlist={playlist}
                  isLoading={loading}
                  onPressTrack={this.handlePressNewTrack}
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
          <Query<PlaylistData> query={GET_LISTENED_NOW}>
            {({ loading, data }) => {
              const playlist = L.get(data, 'playlist.items')
              if (!loading && !playlist) {
                return null
              }
              const total = L.get(data, 'playlist.total')
              return (
                <PlaylistSection
                  imageSource={images.LISTENED_NOW}
                  title="Сейчас слушают"
                  subtitle="Обновлен вчера" // TODO: это вычислять по дате?
                  playlist={playlist}
                  isLoading={loading}
                  bottomTextType="tracksCount"
                  tracksCount={total}
                  onPress={this.handlePressListenedNow}
                />
              )
            }}
          </Query>
          <Query<TracksData> query={GET_TOP_WEEK_TRACKS}>
            {({ loading, data }) => {
              const playlist = L.get(data, 'tracks.items')
              if (!loading && !playlist) {
                return null
              }
              return (
                <TracksSection
                  title="Открытие недели"
                  subtitle="Треки, которые неожиданно поднялись в чарте"
                  playlist={playlist}
                  isLoading={loading}
                  onPressTrack={this.handlePressTopWeekTrack}
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
