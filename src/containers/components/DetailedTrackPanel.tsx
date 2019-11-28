import L from 'lodash'
import React, { useMemo, useCallback, forwardRef } from 'react'
import { Animated } from 'react-native'
import { GET_DETAILED_TRACK, NullableTrack } from 'src/apollo'
import {
  SlidingPanel,
  SlidingPanelInstance,
  TRACK_MENU_HEIGHT,
} from 'src/components'
import TrackMenu from './TrackMenu'
import styled from 'src/styled-components'
import { useQuery } from '@apollo/react-hooks'

const Dump = styled.View`
  height: ${TRACK_MENU_HEIGHT}px;
`

const DetailedTrackPanel = forwardRef<SlidingPanelInstance>((_, ref) => {
  const animatedValue: Animated.Value = useMemo(() => {
    return new Animated.Value(0)
  }, [])

  const hidePanel = useCallback((): void => {
    if (typeof ref === 'object' && ref && ref.current) {
      ref.current.hide()
    }
  }, [])

  const { data } = useQuery(GET_DETAILED_TRACK)
  const detailedTrack: NullableTrack = L.get(data, 'detailedTrack')

  return (
    <SlidingPanel animatedValue={animatedValue} ref={ref}>
      {detailedTrack ? (
        <TrackMenu onPressCancel={hidePanel} track={detailedTrack} />
      ) : (
        <Dump />
      )}
    </SlidingPanel>
  )
})

export default DetailedTrackPanel
