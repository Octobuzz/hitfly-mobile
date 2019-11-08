import React from 'react'
import { Track } from 'src/apollo'
import { DetailedPanel } from 'src/globalRefs'

export interface DetailedTrackMenuProps {
  showDetailedTrack: (track: Track) => void
}

const withDetailedTrackMenu = (
  WrappedComponent: React.ComponentType<DetailedTrackMenuProps>,
) => (props: any) => (
  <WrappedComponent showDetailedTrack={DetailedPanel.showPanel} {...props} />
)

export default withDetailedTrackMenu
