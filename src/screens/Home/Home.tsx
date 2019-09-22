import L from 'lodash'
import React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import { Query } from '@apollo/react-components'
import { withApollo } from '@apollo/react-hoc'
import { ApolloClient } from 'apollo-client'
import CollectionSection from './CollectionSection'
import PlaylistSection from './PlaylistSection'
import TracksSection from './TracksSection'
import GenresSection from './GenresSection'
import { SafeView } from 'src/components'
import { Genre, Collection, Track } from 'src/apollo'
import { images } from 'src/constants'
import {
  CollectionsData,
  PlaylistData,
  GenreData,
  GET_TOP50,
  GET_GENRES,
  GET_MUSIC_FAN,
  GET_NEW_TRACKS,
  GET_RECOMMENDED,
  GET_LISTENED_NOW,
  GET_TOP_WEEK_TRACKS,
} from './graphql'
import styled from 'src/styled-components'
import { ROUTES } from 'src/navigation'
import gql from 'graphql-tag'

const Container = styled.ScrollView.attrs(() => ({
  showsVerticalScrollIndicator: false,
}))`
  padding-top: 24px;
  flex: 1;
`

const SELECT_COLLECTION = gql`
  mutation SelectCollection($id: string) {
    selectCollection(id: $id) @client
  }
`

interface Props extends NavigationScreenProps {
  client: ApolloClient<any>
}

class Home extends React.Component<Props> {
  private handlePressGenreItem = (item: Genre) => {}

  private handlePressTop50 = () => {
    const { navigation } = this.props
    navigation.navigate(ROUTES.MAIN.TOP_50_PLAYLIST)
  }

  private handlePressListenedNow = () => {
    const { navigation } = this.props
    navigation.navigate(ROUTES.MAIN.LISTENED_NOW_PLAYLIST)
  }

  private handlePressRecommendedHeader = () => {
    const { navigation } = this.props
    navigation.navigate(ROUTES.MAIN.COLLECTION_DETAILS, {
      title: 'Рекомендуем',
      query: GET_RECOMMENDED, // TODO: сделать по-другому, не через навигацию
      onPressItem: this.handlePressRecommendedCollection,
    })
  }
  private handlePressRecommendedCollection = async (collection: Collection) => {
    const { navigation } = this.props
    await this.selectCollection(collection.id)
    navigation.navigate(ROUTES.MAIN.COLLECTION_PLAYLIST, {
      title: 'Рекомендуем',
    })
  }
  private handlePressMusicFanHeader = () => {
    const { navigation } = this.props
    navigation.navigate(ROUTES.MAIN.COLLECTION_DETAILS, {
      title: 'Супер меломан',
      query: GET_MUSIC_FAN, // TODO: сделать по-другому, не через навигацию
      onPressItem: this.handlePressMusicFanCollection,
    })
  }
  private handlePressMusicFanCollection = async (collection: Collection) => {
    const { navigation } = this.props
    await this.selectCollection(collection.id)
    navigation.navigate(ROUTES.MAIN.COLLECTION_PLAYLIST, {
      title: 'Супер меломан',
    })
  }

  private handlePressNewTrack = (track: Track) => {}

  private handlePressTopWeekTrack = (track: Track) => {}

  private selectCollection = (id: number): Promise<any> => {
    const { client } = this.props
    return client.mutate({
      mutation: SELECT_COLLECTION,
      variables: { id },
    })
  }

  render() {
    return (
      <SafeView>
        <Container>
          <Query<CollectionsData> query={GET_RECOMMENDED}>
            {({ loading, data }) => {
              const collections = L.get(data, 'collections.items')
              if (!loading && L.isEmpty(collections)) {
                return null
              }
              return (
                <CollectionSection
                  title="Рекомендованное"
                  subtitle="Плейлисты, собранные специально для тебя"
                  isLoading={loading}
                  collections={collections}
                  onPressHeader={this.handlePressRecommendedHeader}
                  onPressCollection={this.handlePressRecommendedCollection}
                />
              )
            }}
          </Query>
          <Query<PlaylistData> query={GET_TOP50}>
            {({ loading, data }) => {
              const playlist = L.get(data, 'playlist.items')
              if (!loading && L.isEmpty(playlist)) {
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

          <Query<PlaylistData> query={GET_NEW_TRACKS}>
            {({ loading, data }) => {
              const playlist = L.get(data, 'playlist.items')
              if (!loading && L.isEmpty(playlist)) {
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
          <Query<CollectionsData> query={GET_MUSIC_FAN}>
            {({ loading, data }) => {
              const collections = L.get(data, 'collections.items')
              if (!loading && L.isEmpty(collections)) {
                return null
              }
              return (
                <CollectionSection
                  title="Супер меломан 🔥"
                  subtitle="«Русская рулетка» треков"
                  isLoading={loading}
                  collections={collections}
                  onPressHeader={this.handlePressMusicFanHeader}
                  onPressCollection={this.handlePressMusicFanCollection}
                />
              )
            }}
          </Query>
          <Query<GenreData> query={GET_GENRES}>
            {({ loading, data }) => {
              const genres = L.get(data, 'genres')
              if (!loading && L.isEmpty(genres)) {
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
              const total = L.get(data, 'playlist.total')
              return (
                <PlaylistSection
                  imageSource={images.LISTENED_NOW}
                  title="Сейчас слушают"
                  subtitle="Обновлен вчера" // TODO: это вычислять по дате?
                  isLoading={loading}
                  bottomTextType="tracksCount"
                  tracksCount={total}
                  onPress={this.handlePressListenedNow}
                />
              )
            }}
          </Query>
          <Query<PlaylistData> query={GET_TOP_WEEK_TRACKS}>
            {({ loading, data }) => {
              const playlist = L.get(data, 'playlist.items')
              if (!loading && L.isEmpty(playlist)) {
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

export default withApollo<Props>(Home)
