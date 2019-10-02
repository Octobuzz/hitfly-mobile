import React from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import { Track } from 'src/apollo'
import { ToggleTrackProps, DetailedTrackMenuProps } from 'src/containers/HOCs'
import { PlaylistTrack } from 'src/components'
import styled from 'src/styled-components'

interface Props extends ToggleTrackProps, DetailedTrackMenuProps {
  tracks: Track[]
}

const Scroll = styled(FlatList as new () => FlatList<Track>).attrs(() => ({
  initialNumToRender: 10,
}))``

class TracksList extends React.Component<Props> {
  private keyExtractor = (item: Track): string => item.id.toString()

  private renderTrack: ListRenderItem<Track> = ({ item, index }) => {
    const { toggleTrack, showDetailedTrack } = this.props
    const isPlaying = this.isTrackPlaying(item)
    return (
      <PlaylistTrack
        index={index}
        isPlaying={isPlaying}
        onPress={toggleTrack}
        onPressMore={showDetailedTrack}
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

  private getItemLayout = (
    _: any,
    index: number,
  ): { length: number; offset: number; index: number } => {
    const length = PlaylistTrack.size
    return {
      length,
      offset: length * index,
      index,
    }
  }

  render() {
    const { tracks } = this.props
    return (
      <Scroll
        data={tracks}
        getItemLayout={this.getItemLayout}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderTrack}
      />
    )
  }
}

export default TracksList
