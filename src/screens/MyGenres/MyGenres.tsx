import React, { useCallback } from 'react'
import { FlatList } from 'react-native'
import {
  GenreItem,
  Button,
  SafeView,
  View,
  RefreshControl,
  Loader,
} from 'src/components'
import { Genre } from 'src/apollo'
import { styles } from 'src/constants'
import styled from 'src/styled-components'

// TODO: стоит это вынести в отдельный компонент
// ибо уже несколько раз копирую
const Scroll = styled(FlatList as new () => FlatList<Genre>).attrs(() => ({
  numColumns: 3,
  initialNumToRender: 12,
  columnWrapperStyle: {
    justifyContent: 'space-between',
    marginBottom: styles.VIEW_HORIZONTAL_INDENTATION / 2,
  },
  contentContainerStyle: {
    paddingVertical: styles.VIEW_VERTICAL_INDENTATION,
    paddingHorizontal: styles.VIEW_HORIZONTAL_INDENTATION,
  },
}))`
  flex: 1;
`

const SizedLoader = <Loader size={150} />

interface Props {
  genres: Genre[]
  isLoading: boolean
  onPressChange: () => void
  onEndReached: () => void
  onRefresh: () => void
}

const MyGenres: React.FC<Props> = ({
  genres,
  isLoading,
  onRefresh,
  onEndReached,
  onPressChange,
}) => {
  const renderGenre = useCallback(
    ({ item }: { item: Genre }): JSX.Element => <GenreItem item={item} />,
    [],
  )

  return (
    <SafeView>
      <Scroll
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }
        onEndReached={onEndReached}
        ListFooterComponent={isLoading ? SizedLoader : null}
        renderItem={renderGenre}
        data={genres}
      />
      <View noFill>
        <Button
          type="outline"
          onPress={onPressChange}
          title="Изменить любимые жанры"
        />
      </View>
    </SafeView>
  )
}

export default MyGenres
