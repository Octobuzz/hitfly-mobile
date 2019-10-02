import React from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import {
  TabBar,
  TabView,
  NavigationState,
  SceneRendererProps,
} from 'react-native-tab-view'
import Header from './Header'
import AboutMeScreen from './AboutMe'
import { MyMusicScreen, LikedMusicScreen } from './MusicAndAlbums'
import { Profile } from 'src/apollo'
import { helpers } from 'src/utils'
import { TextBase } from 'src/components'
import { DetailedTrackMenuProps } from 'src/containers/HOCs'
import styled from 'src/styled-components'

const StyledTabBar = styled(TabBar).attrs(({ theme }) => ({
  scrollEnabled: true,
  indicatorStyle: {
    backgroundColor: theme.colors.white,
  },
  labelStyle: {
    fontFamily: theme.fonts.regular,
    fontSize: 16,
  },
}))`
  background-color: transparent;
`

const LabelText = styled(TextBase)`
  color: ${({ theme }) => theme.colors.white};
`

interface TabState {
  key: string
  title: string
}

interface State extends NavigationState<TabState> {}

interface Props extends NavigationStackScreenProps, DetailedTrackMenuProps {
  profile: Profile
}

class ProfileTab extends React.Component<Props, State> {
  state = {
    index: 0,
    routes: [
      { key: 'about', title: 'Обо мне' },
      { key: 'myMusic', title: 'Моя музыка' },
      { key: 'likedMusic', title: 'Мне нравится' },
      { key: 'feedback', title: 'Отзывы' },
    ],
  }

  private renderTabBar = (
    props: SceneRendererProps & {
      navigationState: NavigationState<TabState>
    },
  ): React.ReactNode => {
    const {
      profile: { avatar, userName },
    } = this.props

    const subtitle = this.getSubtitle()
    return (
      <Header
        title={userName}
        subtitle={subtitle}
        imageUrl={avatar[0].imageUrl}
        // @ts-ignore блядская либа не экспортит Scene тип
        TabBar={<StyledTabBar renderLabel={this.renderLabel} {...props} />}
      />
    )
  }

  private getSubtitle = (): string | undefined => {
    const {
      profile: { followersCount },
    } = this.props
    if (followersCount) {
      return `${followersCount} ${this.getNameForSubscribers(followersCount)}`
    }
  }

  private getNameForSubscribers = helpers.getNameForCount({
    nominative: 'подписчик',
    genitive: 'подписчика',
    genitiveMultiple: 'подписчиков',
  })

  private renderLabel = (scene: { route: TabState }): React.ReactNode => (
    <LabelText>{scene.route.title}</LabelText>
  )

  private handleIndexChange = (index: number): void => {
    this.setState({ index })
  }

  private renderScene = ({
    route,
  }: SceneRendererProps & { route: TabState }): React.ReactNode => {
    const { showDetailedTrack } = this.props
    switch (route.key) {
      case 'about':
        return <AboutMeScreen />
      case 'myMusic':
        return <MyMusicScreen showDetailedTrack={showDetailedTrack} />
      case 'likedMusic':
        return <LikedMusicScreen showDetailedTrack={showDetailedTrack} />
      case 'feedback':
        return null
      default:
        return null
    }
  }

  render() {
    return (
      <TabView
        lazy
        swipeEnabled={false}
        onIndexChange={this.handleIndexChange}
        navigationState={this.state}
        renderTabBar={this.renderTabBar}
        renderScene={this.renderScene}
      />
    )
  }
}

export default ProfileTab
