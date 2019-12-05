import L from 'lodash'
import React, { useCallback, useEffect } from 'react'
import { withNavigation } from 'react-navigation'
import { TracksSection } from '../components'
import { GET_NEW_TRACKS, PlaylistData, Track } from 'src/apollo'
import { useQueryWithPagination } from 'src/Hooks'
import { routes, names } from 'src/constants'

const itemsSelector = (data?: PlaylistData) => L.get(data, 'playlist.items', [])
const hasMorePagesSelector = (data?: PlaylistData) =>
  L.get(data, 'playlist.hasMorePages', false)

const NewContainer: React.FC<any> = ({ navigation, getRefetcher }) => {
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

  const onPressHeader = useCallback(() => {
    navigation.navigate(routes.MAIN.NEW_PLAYLIST)
  }, [])

  const onPressTrack = useCallback((track: Track) => {
    navigation.navigate(routes.MAIN.NEW_PLAYLIST, { trackToPlay: track })
  }, [])

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

export default withNavigation(NewContainer)
