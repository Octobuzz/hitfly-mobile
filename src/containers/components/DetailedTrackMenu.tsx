import L from 'lodash'
import React, { useCallback, forwardRef, PropsWithChildren } from 'react'
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout'
import { GET_DETAILED_TRACK, NullableTrack } from 'src/apollo'
import { useQuery } from '@apollo/react-hooks'
import TrackMenu from './TrackMenu'
import styled from 'src/styled-components'

const Body = styled.View`
  flex: 1;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.black};
`

const DetailedTrackMenu = forwardRef<DrawerLayout, PropsWithChildren<any>>(
  ({ children }, ref) => {
    const { data } = useQuery(GET_DETAILED_TRACK)
    const detailedTrack: NullableTrack = L.get(data, 'detailedTrack')

    const hideMenu = useCallback(() => {
      if (ref && typeof ref === 'object' && ref.current) {
        ref.current.closeDrawer()
      }
    }, [])

    const renderNavigationView = useCallback(
      () =>
        detailedTrack && (
          <Body>
            <TrackMenu onPressCancel={hideMenu} track={detailedTrack} />
          </Body>
        ),
      [detailedTrack],
    )

    return (
      <DrawerLayout
        ref={ref}
        edgeWidth={0}
        drawerWidth={200}
        drawerPosition="right"
        drawerType="front"
        renderNavigationView={renderNavigationView}
      >
        {children}
      </DrawerLayout>
    )
  },
)

export default DetailedTrackMenu
