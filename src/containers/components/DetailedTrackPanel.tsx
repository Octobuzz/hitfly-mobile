import L from 'lodash'
import React, { useMemo, useCallback, forwardRef } from 'react'
import { GET_DETAILED_TRACK, NullableTrack } from 'src/apollo'
import { ActionSheet, ActionSheetInstance } from 'src/components'
import { useQuery } from '@apollo/react-hooks'
import { useTrackActions } from 'src/Hooks'

const DetailedTrackPanel = forwardRef<ActionSheetInstance>((_, ref) => {
  const { toggleTrackToFavorites } = useTrackActions()
  const { data } = useQuery(GET_DETAILED_TRACK)
  const detailedTrack: NullableTrack = L.get(data, 'detailedTrack')

  const handlePress = useCallback(
    (index: number): void => {
      switch (index) {
        case 0: {
          toggleTrackToFavorites(detailedTrack!)
          break
        }
      }
    },
    [toggleTrackToFavorites, detailedTrack],
  )

  const likeText = useMemo(() => {
    if (detailedTrack && detailedTrack.isFavorite) {
      return 'Из избранного'
    } else {
      return 'В избранное'
    }
  }, [detailedTrack])

  const messageText = useMemo(() => {
    if (detailedTrack) {
      return `${detailedTrack.title} - ${detailedTrack.singer}`
    }
  }, [detailedTrack])

  return (
    <ActionSheet
      ref={ref}
      message={messageText}
      options={[likeText, 'Отмена']}
      cancelButtonIndex={1}
      onPress={handlePress}
    />
  )
})

export default DetailedTrackPanel
