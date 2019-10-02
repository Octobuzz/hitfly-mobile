import React from 'react'
import SlidingUpPanel from 'rn-sliding-up-panel'
import { NullableTrack, Track } from 'src/apollo'
import { TrackMenu, TRACK_MENU_HEIGHT, SlidingPanel } from 'src/components'
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

    private panel?: SlidingUpPanel
    private setPanelRef = (ref: SlidingUpPanel): void => {
      this.panel = ref
    }
    private hidePanel = (): void => {
      if (this.panel) {
        this.panel.hide()
      }
    }

    private showDetailedTrack = (track: Track): void => {
      this.setState({ detailedTrack: track }, () => {
        if (this.panel) {
          this.panel.show()
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
          <SlidingPanel
            showBackdrop={!!detailedTrack}
            forwardRef={this.setPanelRef}
          >
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
