import L from 'lodash'
import React from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import {
  NewSection,
  StarsSection,
  Top50Section,
  GenresSection,
  TopWeekSection,
  MusicFanSection,
  ListenedNowSection,
  RecommendedSection,
} from './containers'
import { SafeView, RefreshControl } from 'src/components'
import styled from 'src/styled-components'

const Container = styled.ScrollView`
  padding-top: 24px;
  flex: 1;
`

interface Props extends NavigationStackScreenProps {}

class Home extends React.Component<Props> {
  private refreshAllSections = (): void => {
    L.each(this.sectionsRefetchers, refetcher => refetcher())
  }

  private sectionsRefetchers: { [id: string]: any } = {}
  private setRefetcher = (id: string) => (refetcher?: () => void) => {
    if (refetcher) {
      this.sectionsRefetchers[id] = refetcher
    }
  }

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
          {/* беда с типами и похер */}
          <StarsSection getRefetcher={this.setRefetcher('stars')} />

          <NewSection getRefetcher={this.setRefetcher('newTracks')} />

          <RecommendedSection getRefetcher={this.setRefetcher('recommended')} />

          <Top50Section getRefetcher={this.setRefetcher('top50')} />

          <ListenedNowSection getRefetcher={this.setRefetcher('listenedNow')} />

          <GenresSection getRefetcher={this.setRefetcher('genres')} />

          <MusicFanSection getRefetcher={this.setRefetcher('musicFun')} />

          <TopWeekSection getRefetcher={this.setRefetcher('topWeekTracks')} />
        </Container>
      </SafeView>
    )
  }
}

export default Home
