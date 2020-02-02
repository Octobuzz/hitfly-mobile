import React, { useCallback } from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { DocumentNode } from 'graphql'
import { useQueryWithPagination } from 'src/hooks'
import { withChangingHeaderSettings } from 'src/HOCs'
import AlbumsDetailedScreen from './AlbumsDetailed'
import { routes, names } from 'src/constants'
import { Album } from 'src/apollo'

interface Props extends NavigationStackScreenProps {
  query: DocumentNode
  limit?: number
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
  limit = names.DETAILED_LIMIT,
  ...rest
}) => {
  const {
    items,
    refetch,
    onEndReached,
    networkStatus,
  } = useQueryWithPagination(query, {
    limit,
    itemsSelector,
    hasMorePagesSelector,
    notifyOnNetworkStatusChange: true,
  })

  const albums = transformer ? items.map(transformer) : items

  const onPressAlbum = useCallback((album: Album) => {
    navigation.navigate(routes.PROFILE.ALBUM_PLAYLIST, {
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
