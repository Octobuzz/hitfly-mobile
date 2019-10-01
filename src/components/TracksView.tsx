import React from 'react'
import { View } from 'react-native'
import { Track } from 'src/apollo'
import { ToggleTrackProps, DetailedTrackMenuProps } from 'src/containers/HOCs'
import { PlaylistTrack } from 'src/components'

interface Props extends ToggleTrackProps, DetailedTrackMenuProps {
  tracks: Track[]
}

class TracksView extends React.Component<Props> {
  private renderTrack = (item: Track, index: number): React.ReactNode => {
    const { toggleTrack, showDetailedTrack } = this.props
    const isPlaying = this.isTrackPlaying(item)
    return (
      <PlaylistTrack
        key={item.id.toString()}
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

  render() {
    const { tracks } = this.props
    return <View>{tracks.map(this.renderTrack)}</View>
  }
}

export default TracksView
