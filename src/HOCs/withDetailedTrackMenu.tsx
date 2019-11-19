import React from 'react'
import { Track } from 'src/apollo'
import { DetailedPanelRef } from 'src/globalRefs'

export interface DetailedTrackMenuProps {
  showDetailedTrack: (track: Track) => void
}

const withDetailedTrackMenu = (
  WrappedComponent: React.ComponentType<DetailedTrackMenuProps>,
) => (props: any) => (
  <WrappedComponent showDetailedTrack={DetailedPanelRef.showPanel} {...props} />
)

export default withDetailedTrackMenu
