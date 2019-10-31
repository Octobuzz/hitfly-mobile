import React, { useState, useCallback, useEffect } from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import { Genre } from 'src/apollo'
import Icon from 'react-native-vector-icons/Ionicons'
import {
  View,
  Stretcher,
  Button,
  TextBase,
  SafeView,
  Loader,
  RefreshControl,
} from 'src/components'
import GenreCheckBox from './GenreCheckBox'
import { styles } from 'src/constants'
import styled from 'src/styled-components'

const Wrapper = styled(SafeView)`
  background-color: ${({ theme }) => theme.colors.black};
`

const IndentedButton = styled(Button)`
  margin-bottom: 16px;
`

const Scroll = styled(FlatList as new () => FlatList<Genre>).attrs(() => ({
  numColumns: 2,
  initialNumToRender: 12,
  columnWrapperStyle: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  contentContainerStyle: {
    paddingHorizontal: styles.VIEW_HORIZONTAL_INDENTATION,
  },
}))`
  height: 300px;
`

const CloseIcon = styled(Icon).attrs(({ theme }) => ({
  name: 'md-close',
  size: 24,
  color: theme.colors.white,
}))``

const CloseButton = styled.TouchableOpacity.attrs(() => ({
  hitSlop: styles.HIT_SLOP,
}))`
  align-self: flex-end;
`

const TitleWrapper = styled.View`
  padding-bottom: 32px;
  margin-bottom: 32px;
  border-bottom-width: 2px;
  border-bottom-color: ${({ theme }) => theme.colors.transparentWhite50};
`

const TitleText = styled(TextBase)`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
`

interface Props {
  isLoading: boolean
  mainGenre: Genre
  subGenres: Genre[]
  onRefresh: () => void
  onSubmit: (subGenres: Record<number, boolean>) => void
  onClose: () => void
}

const selectAllGenres = (genres: Genre[]): Record<number, boolean> => {
  const res: Record<number, boolean> = {}
  for (const genre of genres) {
    res[genre.id] = true
  }
  return res
}

const SubGenres: React.FC<Props> = ({
  onClose,
  onSubmit,
  subGenres,
  isLoading,
  onRefresh,
  mainGenre: { title: mainTitle },
}) => {
  const [selectedGenres, setSelectedGenres] = useState<Record<number, boolean>>(
    {},
  )

  useEffect(() => {
    setSelectedGenres(selectAllGenres(subGenres))
  }, [subGenres])

  const toggleGenre = useCallback(
    (genre: Genre): void => {
      const currentGenreValue = selectedGenres[genre.id]
      const newSelectedGenres = {
        ...selectedGenres,
        [genre.id]: !currentGenreValue,
      }
      setSelectedGenres(newSelectedGenres)
    },
    [selectedGenres],
  )

  const renderItem: ListRenderItem<Genre> = useCallback(
    ({ item }) => {
      const isSelected = selectedGenres[item.id]
      return (
        <GenreCheckBox
          genre={item}
          onPress={toggleGenre}
          isSelected={isSelected}
          upperTitle={mainTitle}
        />
      )
    },
    [selectedGenres, toggleGenre, mainTitle],
  )

  const clearSelections = useCallback(() => {
    setSelectedGenres({})
  }, [])

  const handleSubmit = useCallback((): void => {
    onSubmit(selectedGenres)
  }, [selectedGenres, onSubmit])

  return (
    <Wrapper>
      <View noFill paddingVertical={0}>
        <CloseButton onPress={onClose}>
          <CloseIcon />
        </CloseButton>
      </View>
      <Stretcher />
      <TitleWrapper>
        <TitleText>{mainTitle}</TitleText>
      </TitleWrapper>
      {isLoading ? (
        <Loader size={150} />
      ) : (
        <Scroll
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={onRefresh} />
          }
          renderItem={renderItem}
          data={subGenres}
        />
      )}
      <Stretcher />
      <View noFill>
        <IndentedButton
          onPress={clearSelections}
          title="Очистить"
          type="outline-black"
        />
        <Button onPress={handleSubmit} title="Сохранить" />
      </View>
    </Wrapper>
  )
}

export default SubGenres
