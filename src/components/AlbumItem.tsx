import React from 'react'
import { Image } from './Image'
import TextBase from 'src/components/TextBase'
import { Album } from 'src/apollo'
import styled from 'src/styled-components'

const IMAGE_HEIGHT = 160

// сумма высот и отступов
const ITEM_HEIGHT = IMAGE_HEIGHT + 14 + 16 + 8 + 12

const Wrapper = styled.TouchableOpacity``

const AlbumImage = styled(Image)`
  height: ${IMAGE_HEIGHT}px;
  width: 100%;
  margin-bottom: 14px;
  border-radius: 4px;
`

const TitleText = styled(TextBase).attrs(() => ({
  numberOfLines: 1,
}))`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: 16px;
  line-height: 16px;
  margin-bottom: 8px;
`

const SubTitleText = styled(TextBase).attrs(() => ({
  numberOfLines: 1,
}))`
  font-size: 12px;
  line-height: 12px;
  color: ${({ theme }) => theme.colors.textAlt};
`

interface Props {
  item: Album
  onPress?: (item: Album) => void
}

interface Sized {
  height: number
}

const AlbumItem: React.FC<Props> & Sized = ({ item, onPress }) => {
  const { cover, title, group, author } = item
  const handlePress = React.useCallback(() => {
    if (onPress) {
      onPress(item)
    }
  }, [onPress, item])

  return (
    <Wrapper onPress={handlePress} accessibilityRole="summary">
      <AlbumImage source={{ uri: cover[0].imageUrl }} />
      <TitleText>{title}</TitleText>
      <SubTitleText>{group ? group.title : author}</SubTitleText>
    </Wrapper>
  )
}

AlbumItem.height = ITEM_HEIGHT

export default AlbumItem
