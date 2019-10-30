import React, { useState, useCallback } from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import { Genre } from 'src/apollo'
import { View, Stretcher, Button } from 'src/components'
import GenreCheckBox from './GenreCheckBox'
import { styles } from 'src/constants'
import styled from 'src/styled-components'

const Wrapper = styled.View`
  flex: 1;
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

const TitleWrapper = styled.View`
  padding-bottom: 32px;
  border-bottom-width: 2px;
  border-bottom-color: ${({ theme }) => theme.colors.transparentWhite50};
`

const TitleText = styled.View`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
`

interface Props {
  mainGenre: Genre
  subGenres: Genre[]
  onSubmit: (subGenres: Record<number, boolean>) => void
}

const SubGenres: React.FC<Props> = ({
  onSubmit,
  subGenres,
  mainGenre: { title: mainTitle },
}) => {
  const [selectedGenres, setSelectedGenres] = useState<Record<number, boolean>>(
    {},
  )

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
      const isSelected = item.id in selectedGenres
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

  const handleSubmit = useCallback((): void => {
    onSubmit(selectedGenres)
  }, [selectedGenres, onSubmit])

  return (
    <Wrapper>
      <Stretcher />
      <TitleWrapper>
        <TitleText>{mainTitle}</TitleText>
      </TitleWrapper>
      <Scroll renderItem={renderItem} data={subGenres} />
      <Stretcher />
      <View noFill>
        <IndentedButton title="Очистить" type="outline-black" />
        <Button onPress={handleSubmit} title="Сохранить" />
      </View>
    </Wrapper>
  )
}

export default SubGenres
