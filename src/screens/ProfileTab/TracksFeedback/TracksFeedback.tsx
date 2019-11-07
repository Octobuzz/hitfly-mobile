import React from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import TrackWithFeedback from './TrackWithFeedback'
import { Track } from 'src/apollo'
import PeriodToggle from './PeriodToggle'
import { RefreshControl, Loader, View } from 'src/components'
import { DetailedTrackMenuProps, ToggleTrackProps } from 'src/containers/HOCs'
import styled from 'src/styled-components'

const Scroll = styled(FlatList as new () => FlatList<Track>)`
  flex: 1;
  padding: 16px;
`

const Divider = styled.View`
  height: 16px;
`

export type FeedbackPeriod = 'year' | 'month' | 'week'

interface Props extends ToggleTrackProps, DetailedTrackMenuProps {
  tracks: Track[]
  onRefresh: () => void
  onPressPeriod: (period: FeedbackPeriod) => void
  selectedPeriod: FeedbackPeriod
  isLoading: boolean
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
      onPressPeriod,
      selectedPeriod,
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
            ItemSeparatorComponent={Divider}
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
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
