import React from 'react'
import TrackPlayer, { Track as RNTrack } from 'react-native-track-player'
import { Track } from 'src/apollo'

interface ToggleTrackOptions {
  track: Track
  playlist: Track[]
}

export interface ToggleTrackProps {
  toggleTrack: (options?: ToggleTrackOptions) => void
  activeTrackId: string | null
}

interface State {
  activeTrackId: string | null
}

const withTrackToggle = (
  WrappedComponent: React.ComponentType<ToggleTrackProps>,
) =>
  class TrackToggle extends React.Component<any, State> {
    state: State = {
      activeTrackId: null,
    }

    componentDidMount() {
      this.initActiveTrack()
    }

    private initActiveTrack = async (): Promise<void> => {
      const id = await TrackPlayer.getCurrentTrack()
      const activeTrackId = id || null
      this.setState({ activeTrackId })
    }

    private toggleTrack = (options?: ToggleTrackOptions): void => {
      const { activeTrackId } = this.state
      if (!options) {
        this.pauseTrack()
        this.setState({ activeTrackId: null })
        return
      }
      let newTrackId: string | null = options.track.id.toString()
      if (activeTrackId) {
        if (activeTrackId !== newTrackId) {
          this.playTrack(options)
        } else {
          this.pauseTrack()
          newTrackId = null
        }
      } else {
        this.playTrack(options)
      }
      this.setState({ activeTrackId: newTrackId })
    }

    private playTrack = async ({
      track,
    }: ToggleTrackOptions): Promise<void> => {
      await TrackPlayer.stop()
      await TrackPlayer.add(this.createTrack(track))
      await TrackPlayer.play()
    }

    private pauseTrack = async (): Promise<void> => {
      await TrackPlayer.stop()
    }

    private createTrack = ({
      id,
      fileUrl,
      title,
      group,
      singer,
    }: Track): RNTrack => {
      return {
        id: id.toString(),
        url: fileUrl,
        title,
        artist: group ? group.title : singer,
      }
    }

    private createPlaylist = (playlist: Track[]): RNTrack[] => {
      return playlist.map(this.createTrack)
    }

    render() {
      const { activeTrackId } = this.state
      return (
        <WrappedComponent
          toggleTrack={this.toggleTrack}
          activeTrackId={activeTrackId}
          {...this.props}
        />
      )
    }
  }

export default withTrackToggle
