import L from 'lodash'
import React, { useCallback, useEffect } from 'react'
import { TracksSection } from '../components'
import { GET_NEW_TRACKS, PlaylistData, Track } from 'src/apollo'
import { useQueryWithPagination, useNavigation } from 'src/hooks'
import { routes, names } from 'src/constants'
import { withTrackToggle, ToggleTrackProps } from 'src/HOCs'
import { WithGetRefetcher } from './interfaces'

const itemsSelector = (data?: PlaylistData) => L.get(data, 'playlist.items', [])
const hasMorePagesSelector = (data?: PlaylistData) =>
  L.get(data, 'playlist.hasMorePages', false)

interface Props extends ToggleTrackProps, WithGetRefetcher {}

const NewContainer: React.FC<Props> = ({ getRefetcher, toggleTrack }) => {
  const {
    items,
    refetch,
    networkStatus,
    onEndReached,
  } = useQueryWithPagination<PlaylistData>(GET_NEW_TRACKS, {
    itemsSelector,
    hasMorePagesSelector,
    limit: names.HOME_SECTION_LIMIT,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  })

  useEffect(() => {
    if (getRefetcher) {
      getRefetcher(refetch)
    }
  }, [getRefetcher])

  const navigation = useNavigation()

  const onPressHeader = useCallback(() => {
    navigation.navigate(routes.MAIN.NEW_PLAYLIST)
  }, [])

  const onPressTrack = useCallback(
    (track: Track) => {
      toggleTrack({
        track,
        playlistData: {
          playlist: items,
          playlistKey: `${names.PLAYLIST_KEYS.NEW_TRACKS}:${items.length}`,
        },
      })
      navigation.navigate(routes.MAIN.NEW_PLAYLIST)
    },
    [toggleTrack, items],
  )

  const isLoading = networkStatus === 4 || networkStatus === 1

  return (
    <TracksSection
      onPressTrack={onPressTrack}
      onPressHeader={onPressHeader}
      title="Новое"
      playlist={items}
      isLoading={isLoading}
      isFetchingMore={networkStatus === 3}
      onEndReached={onEndReached}
    />
  )
}

export default withTrackToggle(NewContainer)
