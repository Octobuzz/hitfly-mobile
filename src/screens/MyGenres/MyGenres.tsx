import React, { useCallback } from 'react'
import { FlatList } from 'react-native'
import {
  View,
  Button,
  Loader,
  SafeView,
  GenreItem,
  RefreshControl,
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
    marginBottom: styles.VIEW_HORIZONTAL_INDENTATION / 2,
  },
  contentContainerStyle: {
    paddingVertical: styles.VIEW_VERTICAL_INDENTATION,
    paddingHorizontal: (styles.VIEW_HORIZONTAL_INDENTATION / 4) * 3,
  },
}))`
  flex: 1;
`

const Col = styled.View`
  padding-horizontal: ${styles.VIEW_HORIZONTAL_INDENTATION / 4};
`

interface Props {
  genres: Genre[]
  isLoading: boolean
  isRefreshing: boolean
  onPressChange: () => void
  onRefresh: () => Promise<any>
}

const MyGenres: React.FC<Props> = ({
  genres,
  isLoading,
  onRefresh,
  isRefreshing,
  onPressChange,
}) => {
  const renderGenre = useCallback(
    ({ item }: { item: Genre }): JSX.Element => (
      <Col>
        <GenreItem item={item} />
      </Col>
    ),
    [],
  )

  return (
    <>
      {isLoading && !isRefreshing ? (
        <Loader isFilled />
      ) : (
        <Scroll
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
          renderItem={renderGenre}
          data={genres}
        />
      )}
      <View noFill>
        <Button
          type="outline"
          onPress={onPressChange}
          title="Изменить любимые жанры"
        />
      </View>
    </>
  )
}

export default MyGenres
