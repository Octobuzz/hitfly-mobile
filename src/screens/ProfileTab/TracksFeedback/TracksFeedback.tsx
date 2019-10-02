import React from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import TrackWithFeedback from './TrackWithFeedback'
import { Track } from 'src/apollo'
import { RefreshControl } from 'src/components'
import { DetailedTrackMenuProps, ToggleTrackProps } from 'src/containers/HOCs'
import styled from 'src/styled-components'

const Scroll = styled(FlatList as new () => FlatList<Track>)`
  flex: 1;
  padding: 16px;
`

const Divider = styled.View`
  height: 16px;
`

interface Props extends ToggleTrackProps, DetailedTrackMenuProps {
  tracks: Track[]
  onRefresh: () => void
  isLoading: boolean
}

interface State {
  isRefreshing: boolean
}

class TracksFeedback extends React.Component<Props, State> {
  state: State = {
    isRefreshing: false,
  }

  static getDerivedStateFromProps = (
    { isLoading }: Props,
    { isRefreshing }: State,
  ): Partial<State> | null => {
    if (isRefreshing && !isLoading) {
      return {
        isRefreshing: false,
      }
    }

    return null
  }

  private renderItem: ListRenderItem<Track> = ({ item, index }) => {
    const { toggleTrack, showDetailedTrack } = this.props
    const isPlaying = this.isTrackPlaying(item)
    return (
      <TrackWithFeedback
        onPress={toggleTrack}
        onPressMore={showDetailedTrack}
        isPlaying={isPlaying}
        index={index}
        track={item}
      />
    )
  }

  private isTrackPlaying = (track: Track): boolean => {
    const { activeTrack } = this.props
    if (!activeTrack) {
      return false
    }
    return activeTrack.id === track.id
  }

  private keyExtractor = (item: Track): string => item.id.toString()

  private handleRefresh = (): void => {
    const { onRefresh } = this.props
    this.setState({ isRefreshing: true }, onRefresh)
  }

  render() {
    const { tracks } = this.props
    const { isRefreshing } = this.state
    return (
      <Scroll
        ItemSeparatorComponent={Divider}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={this.handleRefresh}
          />
        }
        data={tracks}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
      />
    )
  }
}

export default TracksFeedback
