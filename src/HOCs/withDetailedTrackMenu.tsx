import React, { createRef } from 'react'
import { NullableTrack, Track } from 'src/apollo'
import {
  TRACK_MENU_HEIGHT,
  TrackMenu,
  SlidingPanel,
  SlidingPanelInstance,
} from 'src/components'
import styled from 'src/styled-components'

const Dump = styled.View`
  height: ${TRACK_MENU_HEIGHT}px;
`

export interface DetailedTrackMenuProps {
  showDetailedTrack: (track: Track) => void
}

interface Props {
  tracks: Track[]
}

interface State {
  detailedTrack: NullableTrack
}

const withDetailedTrackMenu = (
  WrappedComponent: React.ComponentType<DetailedTrackMenuProps>,
) =>
  class DetailedTrackMenu extends React.Component<Props, State> {
    state: State = {
      detailedTrack: null,
    }

    private panel = createRef<SlidingPanelInstance>()

    private hidePanel = (): void => {
      if (this.panel && this.panel.current) {
        this.panel.current.hide()
      }
    }

    private showDetailedTrack = (track: Track): void => {
      this.setState({ detailedTrack: track }, () => {
        if (this.panel && this.panel.current) {
          this.panel.current.show()
        }
      })
    }

    render() {
      const { detailedTrack } = this.state
      return (
        <>
          <WrappedComponent
            showDetailedTrack={this.showDetailedTrack}
            {...this.props}
          />
          <SlidingPanel forwardRef={this.panel}>
            {detailedTrack ? (
              <TrackMenu onPressCancel={this.hidePanel} track={detailedTrack} />
            ) : (
              <Dump />
            )}
          </SlidingPanel>
        </>
      )
    }
  }

export default withDetailedTrackMenu
