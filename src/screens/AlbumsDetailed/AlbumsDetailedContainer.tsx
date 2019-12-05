import L from 'lodash'
import React, { useCallback } from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import AlbumsDetailedScreen from './AlbumsDetailed'
import {
  withChangingHeaderSettings,
  withSelectors,
  SelectorsProps,
} from 'src/HOCs'
import { Album } from 'src/apollo'
import { routes, names } from 'src/constants'
import { useQueryWithPagination } from 'src/Hooks'
import { DocumentNode } from 'graphql'

interface Props extends NavigationStackScreenProps {
  query: DocumentNode
  transformer?: (data?: any) => Album
  itemsSelector: (data: any) => Album[]
  hasMorePagesSelector: (data: any) => boolean
}

const AlbumsDetailedContainer: React.FC<Props & SelectorsProps> = ({
  query,
  itemsSelector,
  hasMorePagesSelector,
  transformer,
  navigation,
  selectAlbum,
  ...rest
}) => {
  const {
    items,
    refetch,
    onEndReached,
    networkStatus,
  } = useQueryWithPagination(query, {
    itemsSelector,
    hasMorePagesSelector,
    limit: names.DETAILED_LIMIT,
    notifyOnNetworkStatusChange: true,
  })

  let albums = items
  if (transformer) {
    albums = albums.map(transformer)
  }

  const onPressAlbum = useCallback(async (album: Album) => {
    await selectAlbum(album.id)
    navigation.navigate(routes.MAIN.ALBUM_PLAYLIST, {
      title: album.title,
      albumId: album.id,
    })
  }, [])

  return (
    <AlbumsDetailedScreen
      albums={albums}
      onRefresh={refetch}
      isRefreshing={networkStatus === 4}
      isLoading={networkStatus === 1}
      isFetchingMore={networkStatus === 3}
      onPressAlbum={onPressAlbum}
      onEndReached={onEndReached}
      {...rest}
    />
  )
}

export default L.flowRight(
  withChangingHeaderSettings({ state: 'main', mode: 'dark' }),
  withSelectors,
)(AlbumsDetailedContainer) as React.FC<Props>
