import React from 'react'
import { View } from 'react-native'
import SlidingUpPanel from 'rn-sliding-up-panel'
import { Track, NullableTrack } from 'src/apollo'
import { ToggleTrackProps } from 'src/containers/HOCs'
import { TrackMenu, SlidingPanel, PlaylistTrack } from 'src/components'

interface Props extends ToggleTrackProps {
  tracks: Track[]
}

interface State {
  detailedTrack: NullableTrack
}

class TracksView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    // нужно для вычисления правильной высоты SlidingPanel
    const detailedTrack = props.tracks[0] || null
    this.state = {
      detailedTrack,
    }
  }

  private renderTrack = (item: Track, index: number): React.ReactNode => {
    const { toggleTrack } = this.props
    const isPlaying = this.isTrackPlaying(item)
    return (
      <PlaylistTrack
        key={item.id.toString()}
        index={index}
        isPlaying={isPlaying}
        onPress={toggleTrack}
        onPressMore={this.handlePressMore}
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

  private handlePressMore = (track: Track): void => {
    this.setState({ detailedTrack: track }, () => {
      if (this.panel) {
        this.panel.show()
      }
    })
  }

  private panel?: SlidingUpPanel
  private setPanelRef = (ref: SlidingUpPanel): void => {
    this.panel = ref
  }
  private hidePanel = (): void => {
    if (this.panel) {
      this.panel.hide()
    }
  }

  render() {
    const { tracks } = this.props
    const { detailedTrack } = this.state
    return (
      <>
        <View>{tracks.map(this.renderTrack)}</View>
        {detailedTrack && (
          <SlidingPanel forwardRef={this.setPanelRef}>
            <TrackMenu onPressCancel={this.hidePanel} track={detailedTrack} />
          </SlidingPanel>
        )}
      </>
    )
  }
}

export default TracksView
