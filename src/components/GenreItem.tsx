import React from 'react'
import FastImage from 'react-native-fast-image'
import { images } from 'src/constants'
import styled from 'src/styled-components'

const Wrapper = styled.TouchableOpacity`
  border-radius: 4px;
  width: 109px;
  height: 109px;
  overflow: hidden;
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

interface Item {
  imageUrl: string
}

interface Selectable {
  isSelected?: boolean
}

interface Props extends Selectable {
  item: Item
  onPress: (item: Item) => void
}

const GenreItem = ({ item, isSelected, onPress }: Props) => {
  const { imageUrl } = item
  const handlePress = React.useCallback(() => {
    onPress(item)
  }, [onPress, item])

  return (
    <Wrapper onPress={handlePress}>
      <GenreImage source={{ uri: imageUrl }} />
      <CornerImage isSelected={isSelected} />
    </Wrapper>
  )
}

export default GenreItem
