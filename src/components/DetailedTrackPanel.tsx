import React, { createRef } from 'react'
import { NullableTrack, Track } from 'src/apollo'
import SlidingPanel, { SlidingPanelInstance } from './SlidingPanel'
import TrackMenu, { TRACK_MENU_HEIGHT } from './TrackMenu'
import styled from 'src/styled-components'

const Dump = styled.View`
  height: ${TRACK_MENU_HEIGHT}px;
`

export interface DetailedTrackMenuProps {
  showDetailedTrack: (track: Track) => void
}

interface State {
  detailedTrack: NullableTrack
}

class DetailedTrackPanel extends React.Component<any, State> {
  state: State = {
    detailedTrack: null,
  }

  private panel = createRef<SlidingPanelInstance>()

  hidePanel = (): void => {
    if (this.panel && this.panel.current) {
      this.panel.current.hide()
    }
  }

  showDetailedTrack = (track: Track): void => {
    this.setState({ detailedTrack: track }, () => {
      if (this.panel && this.panel.current) {
        this.panel.current.show()
      }
    })
  }

  render() {
    const { detailedTrack } = this.state
    return (
      <SlidingPanel forwardRef={this.panel}>
        {detailedTrack ? (
          <TrackMenu onPressCancel={this.hidePanel} track={detailedTrack} />
        ) : (
          <Dump />
        )}
      </SlidingPanel>
    )
  }
}

export default DetailedTrackPanel
