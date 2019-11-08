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
