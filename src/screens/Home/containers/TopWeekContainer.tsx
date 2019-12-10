import L from 'lodash'
import React, { useEffect, useCallback } from 'react'
import { TracksSection } from '../components'
import { routes, names } from 'src/constants'
import { useQueryWithPagination, useNavigation } from 'src/hooks'
import { GET_TOP_WEEK_TRACKS, Track } from 'src/apollo'
import { ToggleTrackProps, withTrackToggle } from 'src/HOCs'
import { WithGetRefetcher } from './interfaces'

const itemsSelector = (data: any) => L.get(data, 'playlist.items', [])
const hasMorePagesSelector = (data: any) =>
  L.get(data, 'playlist.hasMorePages', false)

interface Props extends ToggleTrackProps, WithGetRefetcher {}

const TopWeekContainer: React.FC<Props> = ({ toggleTrack, getRefetcher }) => {
  const {
    items,
    refetch,
    networkStatus,
    onEndReached,
  } = useQueryWithPagination(GET_TOP_WEEK_TRACKS, {
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
    navigation.navigate(routes.MAIN.TOP_WEEK_PLAYLIST)
  }, [])

  const onPressTrack = useCallback(
    (track: Track) => {
      toggleTrack({
        track,
        playlistData: {
          playlist: items,
          playlistKey: `${names.PLAYLIST_KEYS.TOP_WEEK}:${items.length}`,
        },
      })
      navigation.navigate(routes.MAIN.TOP_WEEK_PLAYLIST)
    },
    [toggleTrack, items],
  )

  const isLoading = networkStatus === 4 || networkStatus === 1

  return (
    <TracksSection
      onPressTrack={onPressTrack}
      onPressHeader={onPressHeader}
      playlist={items}
      isLoading={isLoading}
      isFetchingMore={networkStatus === 3}
      onEndReached={onEndReached}
      title="Открытие недели"
      subtitle="Треки, которые неожиданно поднялись в чарте"
    />
  )
}

export default withTrackToggle(TopWeekContainer)
