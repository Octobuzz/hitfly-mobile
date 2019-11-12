import L from 'lodash'
import React from 'react'
import TrackPlayer, {
  Track as RNTrack,
  EmitterSubscription,
} from 'react-native-track-player'
import { Track } from 'src/apollo'

interface ToggleTrackOptions {
  track: Track
  playlist: Track[]
}

export interface ToggleTrackProps {
  toggleTrack: (options?: ToggleTrackOptions) => void
  activeTrackId: string | undefined
}

interface State {
  activeTrackId: string | undefined
}

const withTrackToggle = (
  WrappedComponent: React.ComponentType<ToggleTrackProps>,
) =>
  class TrackToggle extends React.Component<any, State> {
    trackChangedSubscription: EmitterSubscription

    constructor(props: any) {
      super(props)

      this.state = {
        activeTrackId: undefined,
      }

      this.trackChangedSubscription = TrackPlayer.addEventListener(
        'playback-track-changed',
        this.setActiveTrack,
      )
    }

    componentDidMount() {
      this.setActiveTrack()
    }

    componentWillUnmount() {
      this.trackChangedSubscription.remove()
    }

    private setActiveTrack = async (): Promise<void> => {
      const { activeTrackId } = this.state
      const id = await TrackPlayer.getCurrentTrack()
      if (id !== activeTrackId) {
        this.setState({ activeTrackId })
      }
    }

    private toggleTrack = (options?: ToggleTrackOptions): void => {
      const { activeTrackId } = this.state
      if (!options) {
        this.pauseTrack()
        this.setState({ activeTrackId: undefined })
        return
      }
      let newTrackId: string | undefined = options.track.id.toString()
      if (activeTrackId) {
        if (activeTrackId !== newTrackId) {
          this.playTrack(options)
        } else {
          this.pauseTrack()
          newTrackId = undefined
        }
      } else {
        this.playTrack(options)
      }
      this.setState({ activeTrackId: newTrackId })
    }

    private playTrack = async ({
      track,
      playlist,
    }: ToggleTrackOptions): Promise<void> => {
      // TODO: добавить проверку на PAUSED state
      const queue = await TrackPlayer.getQueue()
      const isEqualPlaylists = L.isEqualWith(
        queue,
        playlist,
        (obj, oth) => +obj.id === oth.id,
      )
      if (!isEqualPlaylists) {
        TrackPlayer.reset()
        await TrackPlayer.add(this.createPlaylist(playlist))
      }
      await TrackPlayer.skip(track.id.toString())
      await TrackPlayer.play()
    }

    private pauseTrack = async (): Promise<void> => {
      await TrackPlayer.pause()
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
