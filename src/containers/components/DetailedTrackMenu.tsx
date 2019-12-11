import L from 'lodash'
import React, { useCallback, forwardRef } from 'react'
import { GET_DETAILED_TRACK, NullableTrack } from 'src/apollo'
import { useQuery } from '@apollo/react-hooks'
import { Modal, TrackMenu } from 'src/components'
import { useTrackActions } from 'src/hooks'

const DetailedTrackMenu = forwardRef<Modal>((_, ref) => {
  const { data } = useQuery(GET_DETAILED_TRACK)
  const detailedTrack: NullableTrack = L.get(data, 'detailedTrack')

  const { toggleTrackToFavorites } = useTrackActions()

  const hide = useCallback(() => {
    if (ref && typeof ref === 'object' && ref.current) {
      ref.current.hide()
    }
  }, [])

  return (
    <Modal ref={ref} onClose={hide}>
      {detailedTrack && (
        <TrackMenu
          onPressLike={toggleTrackToFavorites}
          onPressCancel={hide}
          track={detailedTrack}
        />
      )}
    </Modal>
  )
})

export default DetailedTrackMenu
