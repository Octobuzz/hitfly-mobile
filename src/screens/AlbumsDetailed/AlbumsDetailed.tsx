import React, { useCallback } from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import { Album } from 'src/apollo'
import { styles } from 'src/constants'
import {
  Loader,
  SafeView,
  AlbumItem,
  RefreshControl,
  ListFooterLoader,
} from 'src/components'
import styled from 'src/styled-components'

const Scroll = styled(FlatList as new () => FlatList<Album>).attrs(() => ({
  numColumns: 2,
  initialNumToRender: 8,
  columnWrapperStyle: {
    justifyContent: 'space-between',
    marginBottom: styles.VIEW_HORIZONTAL_INDENTATION,
  },
}))`
  flex: 1;
  padding: ${styles.VIEW_VERTICAL_INDENTATION}px
    ${styles.VIEW_HORIZONTAL_INDENTATION}px;
`

interface Props {
  albums: Album[]
  isLoading: boolean
  isRefreshing: boolean
  isFetchingMore: boolean
  onRefresh: () => void
  onEndReached: () => void
  onPressAlbum: (album: Album) => Promise<void>
}

const AlbumsDetailed: React.FC<Props> = ({
  albums,
  isLoading,
  onRefresh,
  onPressAlbum,
  isRefreshing,
  onEndReached,
  isFetchingMore,
}) => {
  const renderGenre: ListRenderItem<Album> = useCallback(
    ({ item }) => <AlbumItem onPress={onPressAlbum} item={item} />,
    [],
  )

  return (
    <SafeView>
      {isLoading ? (
        <Loader isFilled />
      ) : (
        <Scroll
          onEndReached={onEndReached}
          onEndReachedThreshold={0.8}
          ListFooterComponent={<ListFooterLoader isShown={isFetchingMore} />}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
          renderItem={renderGenre}
          data={albums}
        />
      )}
    </SafeView>
  )
}

export default AlbumsDetailed
