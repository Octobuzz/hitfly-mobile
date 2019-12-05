import React, { useCallback } from 'react'
import {
  Track,
  SELECT_DETAILED_TRACK,
  SelectDetailedTrackVariables,
} from 'src/apollo'
import { DetailedPanelRef } from 'src/globalRefs'
import { useMutation } from '@apollo/react-hooks'

export interface DetailedTrackMenuProps {
  showDetailedTrack: (track: Track) => void
}

const withDetailedTrackMenu = (
  WrappedComponent: React.ComponentType<DetailedTrackMenuProps>,
) => {
  return (props: any): JSX.Element => {
    const [selectTrack] = useMutation<void, SelectDetailedTrackVariables>(
      SELECT_DETAILED_TRACK,
    )
    const showDetailedTrack = useCallback(async (track: Track) => {
      await selectTrack({ variables: { id: track.id } })
      DetailedPanelRef.showPanel()
    }, [])
    return <WrappedComponent showDetailedTrack={showDetailedTrack} {...props} />
  }
}

export default withDetailedTrackMenu
