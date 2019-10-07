import L from 'lodash'
import React from 'react'
import { Linking } from 'react-native'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { Query } from '@apollo/react-components'
import { ApolloClient } from 'apollo-client'
import CollectionSection from './CollectionSection'
import PlaylistSection from './PlaylistSection'
import TracksSection from './TracksSection'
import GenresSection from './GenresSection'
import StarsSection from './StarsSection'
import { SafeView } from 'src/components'
import { Genre, Collection, Track, CollectionsType, User } from 'src/apollo'
import { images } from 'src/constants'
import {
  CollectionsData,
  PlaylistData,
  GenreData,
  StarsData,
  GET_TOP50,
  GET_STARS,
  GET_GENRES,
  GET_MUSIC_FAN,
  GET_NEW_TRACKS,
  GET_RECOMMENDED,
  GET_LISTENED_NOW,
  GET_TOP_WEEK_TRACKS,
} from './graphql'
import { DOMAIN_URL } from 'src/constants/names'
import { ROUTES } from 'src/navigation'
import gql from 'graphql-tag'
import styled from 'src/styled-components'

const Container = styled.ScrollView.attrs(() => ({
  showsVerticalScrollIndicator: false,
}))`
  padding-top: 24px;
  flex: 1;
`

const SELECT_COLLECTION = gql`
  mutation SelectCollection($id: Int!) {
    selectCollection(id: $id) @client
  }
`
const SELECT_GENRE = gql`
  mutation SelectGenre($id: Int!) {
    selectGenre(id: $id) @client
  }
`
const SELECT_COLLECTIONS_TYPE = gql`
  mutation SetCollectionsForDetails($type: String!) {
    setCollectionsForDetails(type: $type) @client
  }
`

interface Props extends NavigationStackScreenProps {
  client: ApolloClient<any>
}

class Home extends React.Component<Props> {
  private handlePressGenreItem = async (item: Genre): Promise<void> => {
    const { client, navigation } = this.props
    await client.mutate({
      mutation: SELECT_GENRE,
      variables: { id: item.id },
    })
    navigation.navigate(ROUTES.MAIN.GENRE_PLAYLIST, { title: item.title })
  }

  private handlePressTop50 = (): void => {
    const { navigation } = this.props
    navigation.navigate(ROUTES.MAIN.TOP_50_PLAYLIST)
  }

  private handlePressListenedNow = (): void => {
    const { navigation } = this.props
    navigation.navigate(ROUTES.MAIN.LISTENED_NOW_PLAYLIST)
  }

  private handlePressRecommendedHeader = async (): Promise<void> => {
    const { navigation } = this.props
    await this.selectCollectionsType('recommended')
    navigation.navigate(ROUTES.MAIN.COLLECTION_DETAILS, {
      title: 'Рекомендуем',
      onPressItem: this.handlePressRecommendedCollection,
    })
  }
  private handlePressRecommendedCollection = async (
    collection: Collection,
  ): Promise<void> => {
    const { navigation } = this.props
    await this.selectCollection(collection.id)
    navigation.navigate(ROUTES.MAIN.COLLECTION_PLAYLIST, {
      title: 'Рекомендуем',
    })
  }
  private handlePressMusicFanHeader = async (): Promise<void> => {
    const { navigation } = this.props
    await this.selectCollectionsType('musicFan')
    navigation.navigate(ROUTES.MAIN.COLLECTION_DETAILS, {
      title: 'Супер меломан',
      onPressItem: this.handlePressMusicFanCollection,
    })
  }
  private handlePressMusicFanCollection = async (
    collection: Collection,
  ): Promise<void> => {
    const { navigation } = this.props
    await this.selectCollection(collection.id)
    navigation.navigate(ROUTES.MAIN.COLLECTION_PLAYLIST, {
      title: 'Супер меломан',
    })
  }

  private goToStarProfile = (user: User): void => {
    Linking.openURL(`${DOMAIN_URL}user/${user.id}`)
  }

  // TODO: дубль, пока не решится следующий TODO
  private handlePressNewHeader = (): void => {
    const { navigation } = this.props
    navigation.navigate(ROUTES.MAIN.NEW_PLAYLIST)
  }
  // TODO: тут сразу трек в play?
  private handlePressNewTrack = (track: Track): void => {
    const { navigation } = this.props
    navigation.navigate(ROUTES.MAIN.NEW_PLAYLIST)
  }

  // TODO: дубль, пока не решится следующий TODO
  private handlePressTopWeekHeader = (): void => {
    const { navigation } = this.props
    navigation.navigate(ROUTES.MAIN.TOP_WEEK_PLAYLIST)
  }
  // TODO: тут сразу трек в play?
  private handlePressTopWeekTrack = (track: Track): void => {
    const { navigation } = this.props
    navigation.navigate(ROUTES.MAIN.TOP_WEEK_PLAYLIST)
  }

  private selectCollection = (id: number): Promise<any> => {
    const { client } = this.props
    return client.mutate({
      mutation: SELECT_COLLECTION,
      variables: { id },
    })
  }

  private selectCollectionsType = (type: CollectionsType): Promise<any> => {
    const { client } = this.props
    return client.mutate({
      mutation: SELECT_COLLECTIONS_TYPE,
      variables: { type },
    })
  }

  // FIXME: переписать через apollo-hoc и добавить рефреш
  render() {
    return (
      <SafeView>
        <Container>
          <Query<StarsData> query={GET_STARS}>
            {({ loading, data }) => {
              const users = L.get(data, 'users.items', [])
              if (!loading && L.isEmpty(users)) {
                return null
              }
              return (
                <StarsSection
                  onPressStar={this.goToStarProfile}
                  users={users}
                  isLoading={loading}
                />
              )
            }}
          </Query>

          <Query<PlaylistData> query={GET_NEW_TRACKS}>
            {({ loading, data }) => {
              const playlist = L.get(data, 'playlist.items', [])
              if (!loading && L.isEmpty(playlist)) {
                return null
              }
              return (
                <TracksSection
                  title="Новое"
                  playlist={playlist}
                  isLoading={loading}
                  onPressHeader={this.handlePressNewHeader}
                  onPressTrack={this.handlePressNewTrack}
                />
              )
            }}
          </Query>

          <Query<CollectionsData> query={GET_RECOMMENDED}>
            {({ loading, data }) => {
              const collections = L.get(data, 'collections.items', [])
              if (!loading && L.isEmpty(collections)) {
                return null
              }
              return (
                <CollectionSection
                  title="Рекомендуем"
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
              const playlist = L.get(data, 'playlist.items', [])
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

          <Query<PlaylistData> query={GET_LISTENED_NOW}>
            {({ loading, data }) => {
              const total = L.get(data, 'playlist.total', [])
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
          <Query<GenreData> query={GET_GENRES}>
            {({ loading, data }) => {
              const genres = L.get(data, 'genres', [])
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

          <Query<CollectionsData> query={GET_MUSIC_FAN}>
            {({ loading, data }) => {
              const collections = L.get(data, 'collections.items', [])
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

          <Query<PlaylistData> query={GET_TOP_WEEK_TRACKS}>
            {({ loading, data }) => {
              const playlist = L.get(data, 'playlist.items', [])
              if (!loading && L.isEmpty(playlist)) {
                return null
              }
              return (
                <TracksSection
                  title="Открытие недели"
                  subtitle="Треки, которые неожиданно поднялись в чарте"
                  playlist={playlist}
                  isLoading={loading}
                  onPressHeader={this.handlePressTopWeekHeader}
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
