import React from 'react'
import { View } from 'react-native'
import { Track } from 'src/apollo'
import { ToggleTrackProps, DetailedTrackMenuProps } from 'src/HOCs'
import PlaylistTrack from 'src/components/PlaylistTrack'

export interface TracksViewProps
  extends Pick<ToggleTrackProps, 'toggleTrack' | 'isPlaying' | 'activeTrack'>,
    DetailedTrackMenuProps {
  tracks: Track[]
  playlistKey: string
}

class TracksView extends React.Component<TracksViewProps> {
  private renderTrack = (item: Track, index: number): React.ReactNode => {
    const { showDetailedTrack } = this.props
    const isPlaying = this.isTrackPlaying(item)
    return (
      <PlaylistTrack
        key={item.id.toString()}
        index={index}
        isPlaying={isPlaying}
        onPress={this.handlePressTrack}
        onPressMore={showDetailedTrack}
        track={item}
      />
    )
  }

  private handlePressTrack = (track: Track) => {
    const { toggleTrack, tracks, playlistKey } = this.props
    toggleTrack({ track, playlistData: { playlist: tracks, playlistKey } })
  }

  private isTrackPlaying = (track: Track): boolean => {
    const { activeTrack, isPlaying } = this.props
    if (!activeTrack || !isPlaying) {
      return false
    }
    return activeTrack.id === track.id
  }

  render() {
    const { tracks } = this.props
    return <View>{tracks.map(this.renderTrack)}</View>
  }
}

export default TracksView
