import React from 'react'
import { NullableTrack } from 'src/apollo'

export interface ToggleTrackProps {
  toggleTrack: (track: NullableTrack) => void
  activeTrack: NullableTrack
}

interface State {
  activeTrack: NullableTrack
}

const withTrackToggle = (
  WrappedComponent: React.ComponentType<ToggleTrackProps>,
) =>
  class TrackToggle extends React.Component<any, State> {
    state: State = {
      activeTrack: null,
    }

    componentDidMount() {
      this.initActiveTrack()
    }

    private initActiveTrack = (): void => {
      // TODO: когда будет готов плеер, сделать запрос на выбор текущего играемого трека
      // и записать его в activeTrack
      const activeTrack = null
      this.setState({ activeTrack })
    }

    private toggleTrack = (track: NullableTrack): void => {
      const { activeTrack } = this.state
      if (!track) {
        // TODO: пауза в глобальном плеере
        this.setState({ activeTrack: null })
        return
      }
      let newTrack: NullableTrack
      if (activeTrack) {
        if (activeTrack.id !== track.id) {
          // TODO: поменять трек в глобальном плеере
          newTrack = track
        } else {
          // TODO: пауза в глобальном плеере
          newTrack = null
        }
      } else {
        // TODO: новый трек в глобальном плеере
        newTrack = track
      }
      this.setState({ activeTrack: newTrack })
    }

    render() {
      const { activeTrack } = this.state
      return (
        <WrappedComponent
          toggleTrack={this.toggleTrack}
          activeTrack={activeTrack}
          {...this.props}
        />
      )
    }
  }

export default withTrackToggle
