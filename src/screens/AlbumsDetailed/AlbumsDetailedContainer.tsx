import React, { useCallback } from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { DocumentNode } from 'graphql'
import { useQueryWithPagination } from 'src/hooks'
import { withChangingHeaderSettings } from 'src/HOCs'
import { routes, names } from 'src/constants'
import { Album } from 'src/apollo'
import AlbumsDetailedScreen from './AlbumsDetailed'

interface Props extends NavigationStackScreenProps {
  query: DocumentNode
  transformer?: (data?: any) => Album
  itemsSelector: (data: any) => Album[]
  hasMorePagesSelector: (data: any) => boolean
}

const AlbumsDetailedContainer: React.FC<Props> = ({
  query,
  navigation,
  transformer,
  itemsSelector,
  hasMorePagesSelector,
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

  const onPressAlbum = useCallback((album: Album) => {
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

export default withChangingHeaderSettings({ state: 'main', mode: 'dark' })(
  AlbumsDetailedContainer,
)
