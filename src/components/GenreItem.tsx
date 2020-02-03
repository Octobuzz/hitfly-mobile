import React from 'react'
import FastImage from 'react-native-fast-image'
import TextBase from 'src/components/TextBase'
import { Genre } from 'src/apollo'
import { images, styles } from 'src/constants'
import styled from 'src/styled-components'

const ITEM_SIZE = styles.COL3_WIDTH

const Wrapper = styled.TouchableOpacity`
  border-radius: 4px;
  width: ${ITEM_SIZE}px;
  height: ${ITEM_SIZE}px;
  overflow: hidden;
`

const TitleTextWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

const GenreImage = styled(FastImage)`
  width: 100%;
  height: 100%;
  position: absolute;
`

const TitleText = styled(TextBase)`
  position: absolute;
  text-align: center;
  font-size: 12px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.white};
`

export interface GenreItemProps {
  item: Genre
  onPress?: (item: Genre) => void
}

interface Sized {
  size: number
}

export const GenreItem: React.FC<GenreItemProps> & Sized = ({
  item,
  onPress,
}) => {
  const { imageUrl, title } = item
  const handlePress = (): void => {
    onPress?.(item)
  }

  return (
    <Wrapper disabled={!onPress} onPress={handlePress} testID="wrapper">
      <GenreImage source={{ uri: imageUrl }} />
      <TitleTextWrapper>
        <TitleText>{title}</TitleText>
      </TitleTextWrapper>
    </Wrapper>
  )
}

GenreItem.size = ITEM_SIZE

// TODO: возможно стоит вынести в общее место
interface Selectable {
  isSelected?: boolean
}

const CornerImage = styled.Image.attrs(({ isSelected }: Selectable) => ({
  source: isSelected ? images.GENRE_ACTIVE : images.GENRE_INACTIVE,
}))<Selectable>`
  position: absolute;
  top: 0;
  right: 0;
`

const SubGenresWrapper = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.8,
}))`
  background-color: ${({ theme }) => theme.colors.white};
  padding-vertical: 12px;
`

const SubGenresText = styled(TextBase)`
  color: ${({ theme }) => theme.colors.brandPink};
  font-size: 14px;
  line-height: 14px;
  text-align: center;
`

export interface SelectableGenreItemProps extends GenreItemProps, Selectable {
  onPressSubGenres?: (genre: Genre) => void
}

export const SelectableGenreItem: React.FC<SelectableGenreItemProps> = ({
  item,
  onPress,
  isSelected,
  onPressSubGenres,
}) => {
  const { imageUrl, title, hasSubGenres } = item
  const handlePress = (): void => {
    onPress?.(item)
  }
  const handlePressSubGenres = (): void => {
    onPressSubGenres?.(item)
  }

  return (
    <Wrapper onPress={handlePress} testID="wrapper">
      <GenreImage source={{ uri: imageUrl }} />
      <CornerImage isSelected={isSelected} />
      <TitleTextWrapper>
        <TitleText>{title}</TitleText>
      </TitleTextWrapper>
      {hasSubGenres && (
        <SubGenresWrapper onPress={handlePressSubGenres} testID="optionalChild">
          <SubGenresText>+ Поджанры</SubGenresText>
        </SubGenresWrapper>
      )}
    </Wrapper>
  )
}
