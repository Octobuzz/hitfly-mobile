import React, { useCallback } from 'react'
import {
  Track,
  SelectDetailedTrackVariables,
  SELECT_DETAILED_TRACK,
} from 'src/apollo'
import { DetailedTrackMenuRef } from 'src/globalRefs'
import { useMutation } from '@apollo/react-hooks'

export interface DetailedTrackMenuProps {
  showDetailedTrack: (track: Track) => void
}

const withDetailedTrackMenu = (
  WrappedComponent: React.ComponentType<DetailedTrackMenuProps>,
) => (props: any): JSX.Element => {
  const [selectTrack] = useMutation<void, SelectDetailedTrackVariables>(
    SELECT_DETAILED_TRACK,
  )
  const showDetailedTrack = useCallback(async (track: Track) => {
    await selectTrack({ variables: { id: track.id } })
    DetailedTrackMenuRef.show()
  }, [])

  return <WrappedComponent showDetailedTrack={showDetailedTrack} {...props} />
}

export default withDetailedTrackMenu
