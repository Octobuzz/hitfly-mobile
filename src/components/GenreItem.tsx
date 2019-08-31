import React from 'react'
import FastImage from 'react-native-fast-image'
import { images } from 'src/constants'
import styled from 'src/styled-components'
import TextBase from 'src/components/TextBase'

const ITEM_SIZE = 109

const Wrapper = styled.TouchableOpacity`
  border-radius: 4px;
  width: ${ITEM_SIZE}px;
  height: ${ITEM_SIZE}px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
`

const CornerImage = styled.Image.attrs(({ isSelected }: Selectable) => ({
  source: isSelected ? images.GENRE_ACTIVE : images.GENRE_INACTIVE,
}))<Selectable>`
  position: absolute;
  top: 0;
  right: 0;
`

const GenreImage = styled(FastImage)`
  width: 100%;
  height: 100%;
`

const TitleText = styled(TextBase)`
  position: absolute;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.white};
`

interface Selectable {
  isSelected?: boolean
}

export interface IGenreItem {
  id: number
  imageUrl: string
  title: string
}

interface Props extends Selectable {
  item: IGenreItem
  onPress: (item: IGenreItem) => void
}

interface Sized {
  size: number
}

const GenreItem: React.FC<Props> & Sized = ({ item, isSelected, onPress }) => {
  const { imageUrl, title } = item
  const handlePress = React.useCallback(() => {
    onPress(item)
  }, [onPress, item])

  return (
    <Wrapper onPress={handlePress}>
      <GenreImage source={{ uri: imageUrl }} />
      <CornerImage isSelected={isSelected} />
      <TitleText>{title}</TitleText>
    </Wrapper>
  )
}

GenreItem.size = ITEM_SIZE

export default GenreItem
