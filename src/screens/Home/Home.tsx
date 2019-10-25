import L from 'lodash'
import React from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { Query } from '@apollo/react-components'
import { ApolloClient } from 'apollo-client'
import PlaylistSection from './PlaylistSection'
import {
  NewSection,
  StarsSection,
  GenresSection,
  TopWeekSection,
  MusicFanSection,
  RecommendedSection,
} from './containers'
import { SafeView, RefreshControl } from 'src/components'
import { images } from 'src/constants'
import { PlaylistData, GET_TOP50, GET_LISTENED_NOW } from './graphql'
import { ROUTES } from 'src/navigation'
import styled from 'src/styled-components'

const Container = styled.ScrollView.attrs(() => ({
  showsVerticalScrollIndicator: false,
}))`
  padding-top: 24px;
  flex: 1;
`

interface Props extends NavigationStackScreenProps {
  client: ApolloClient<any>
}

class Home extends React.Component<Props> {
  private handlePressTop50 = (): void => {
    const { navigation } = this.props
    navigation.navigate(ROUTES.MAIN.TOP_50_PLAYLIST)
  }

  private handlePressListenedNow = (): void => {
    const { navigation } = this.props
    navigation.navigate(ROUTES.MAIN.LISTENED_NOW_PLAYLIST)
  }

  private refreshAllSections = (): void => {
    L.each(this.sectionsRefetchers, refetcher => refetcher())
  }

  private sectionsRefetchers: { [id: string]: any } = {}
  private setRefetcher = (id: string) => (refetcher: () => void) => {
    if (refetcher) {
      this.sectionsRefetchers[id] = refetcher
    }
  }

  // FIXME: переписать через apollo-hoc и добавить рефреш
  render() {
    return (
      <SafeView>
        <Container
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={this.refreshAllSections}
            />
          }
        >
          <StarsSection getRefetcher={this.setRefetcher('stars')} />

          <NewSection getRefetcher={this.setRefetcher('newTracks')} />

          <RecommendedSection getRefetcher={this.setRefetcher('recommended')} />

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

          <GenresSection getRefetcher={this.setRefetcher('genres')} />

          <MusicFanSection getRefetcher={this.setRefetcher('musicFun')} />

          <TopWeekSection getRefetcher={this.setRefetcher('topWeekTracks')} />
        </Container>
      </SafeView>
    )
  }
}

export default Home
