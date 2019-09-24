import React from 'react'
import { StatusBar, Platform } from 'react-native'
import { NavigationEventSubscription } from 'react-navigation'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import {
  TabBar,
  TabView,
  SceneMap,
  NavigationState,
  SceneRendererProps,
} from 'react-native-tab-view'
import Header from './Header'
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

interface Props extends NavigationStackScreenProps {}

class Profile extends React.Component<Props, State> {
  state = {
    index: 0,
    routes: [
      // FIXME: временно
      { key: 'first', title: 'First' },
      { key: 'second', title: 'Second' },
      { key: '3', title: 'Second' },
      { key: '4', title: 'Second' },
      { key: '5', title: 'Second' },
    ],
  }

  componentDidMount() {
    this.setupFocusListeners()
  }

  componentWillUnmount() {
    this.removeFocusListeners()
  }

  private willFocusSubscription?: NavigationEventSubscription
  private removeDidSubscription?: NavigationEventSubscription

  private setupFocusListeners = (): void => {
    const { navigation } = this.props
    this.willFocusSubscription = navigation.addListener('willFocus', () => {
      if (Platform.OS === 'ios') {
        StatusBar.setBarStyle('light-content', true)
      }
    })
    this.removeDidSubscription = navigation.addListener('didBlur', () => {
      if (Platform.OS === 'ios') {
        StatusBar.setBarStyle('dark-content', true)
      }
    })
  }

  private removeFocusListeners = (): void => {
    if (this.willFocusSubscription) {
      this.willFocusSubscription.remove()
    }
    if (this.removeDidSubscription) {
      this.removeDidSubscription.remove()
    }
  }

  private scene = SceneMap({
    first: () => null,
    second: () => null,
    3: () => null,
    4: () => null,
    5: () => null,
  })

  private renderTabBar = (
    props: SceneRendererProps & {
      navigationState: NavigationState<TabState>
    },
  ): React.ReactNode => {
    return (
      <Header
        title="Turok"
        subtitle="Subtitle"
        imageUrl="https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
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

  render() {
    return (
      <TabView
        lazy
        swipeEnabled={false}
        onIndexChange={this.handleIndexChange}
        navigationState={this.state}
        renderTabBar={this.renderTabBar}
        renderScene={this.scene}
      />
    )
  }
}

export default Profile
