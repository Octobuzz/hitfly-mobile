import React from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import { Track } from 'src/apollo'
import PeriodToggle from './PeriodToggle'
import TrackWithFeedback from './TrackWithFeedback'
import { RefreshControl, Loader, View, ListFooterLoader } from 'src/components'
import { DetailedTrackMenuProps, ToggleTrackProps } from 'src/HOCs'
import styled from 'src/styled-components'

const Scroll = styled(FlatList as new () => FlatList<Track>).attrs(() => ({
  contentContainerStyle: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
}))`
  flex: 1;
`

const Divider = styled.View`
  height: 16px;
`

export type FeedbackPeriod = 'year' | 'month' | 'week'

interface Props extends ToggleTrackProps, DetailedTrackMenuProps {
  tracks: Track[]
  playlistKey: string
  onRefresh: () => void
  onEndReached: () => void
  onPressPeriod: (period: FeedbackPeriod) => void
  selectedPeriod: FeedbackPeriod
  isLoading: boolean
  isRefreshing: boolean
  isFetchingMore: boolean
}

class TracksFeedback extends React.Component<Props> {
  private renderItem: ListRenderItem<Track> = ({ item, index }) => {
    const { showDetailedTrack } = this.props
    const isPlaying = this.isTrackPlaying(item)
    return (
      <TrackWithFeedback
        onPress={this.handlePressTrack}
        onPressMore={showDetailedTrack}
        isPlaying={isPlaying}
        index={index}
        track={item}
      />
    )
  }

  private handlePressTrack = (track: Track) => {
    const { toggleTrack, tracks, playlistKey } = this.props
    toggleTrack({ track, playlist: tracks, playlistKey })
  }

  private isTrackPlaying = (track: Track): boolean => {
    const { activeTrack, isPlaying } = this.props
    if (!activeTrack || !isPlaying) {
      return false
    }
    return activeTrack.id === track.id
  }

  render() {
    const {
      tracks,
      onRefresh,
      isLoading,
      isRefreshing,
      onEndReached,
      onPressPeriod,
      selectedPeriod,
      isFetchingMore,
    } = this.props

    return (
      <>
        <View noFill>
          <PeriodToggle
            onPress={onPressPeriod}
            currentPeriod={selectedPeriod}
          />
        </View>
        {isLoading ? (
          <Loader isAbsolute />
        ) : (
          <Scroll
            onEndReached={onEndReached}
            onEndReachedThreshold={0.9}
            ItemSeparatorComponent={Divider}
            ListFooterComponent={<ListFooterLoader isShown={isFetchingMore} />}
            refreshControl={
              <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
            }
            data={tracks}
            renderItem={this.renderItem}
          />
        )}
      </>
    )
  }
}

export default TracksFeedback
