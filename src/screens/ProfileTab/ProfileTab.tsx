import React from 'react'
import {
  TabBar,
  TabView,
  NavigationState,
  SceneRendererProps,
} from 'react-native-tab-view'
import Header from './Header'
import AboutMeScreen from './AboutMe'
import TracksFeedbackScreen from './TracksFeedback'
import { MyMusicScreen, LikedMusicScreen } from './MusicAndAlbums'
import { Profile } from 'src/apollo'
import { TextBase } from 'src/components'
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
  tabStyle: {
    width: 'auto',
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

interface Props {
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
    const { profile } = this.props

    return (
      <Header
        profile={profile}
        // @ts-ignore блядская либа не экспортит Scene тип
        TabBar={<StyledTabBar renderLabel={this.renderLabel} {...props} />}
      />
    )
  }

  private renderLabel = (scene: { route: TabState }): React.ReactNode => (
    <LabelText>{scene.route.title}</LabelText>
  )

  private handleIndexChange = (index: number): void => {
    this.setState({ index })
  }

  private renderScene = ({
    route,
  }: SceneRendererProps & { route: TabState }): React.ReactNode => {
    switch (route.key) {
      case 'about':
        return <AboutMeScreen />
      case 'myMusic':
        return <MyMusicScreen />
      case 'likedMusic':
        return <LikedMusicScreen />
      case 'feedback':
        return <TracksFeedbackScreen />
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
