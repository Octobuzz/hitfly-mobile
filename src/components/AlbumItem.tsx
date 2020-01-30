import React from 'react'
import { Image } from './Image'
import TextBase from './TextBase'
import { Album, NoAvatarSizeNames } from 'src/apollo'
import { styles } from 'src/constants'
import { useImageSource } from 'src/hooks'
import styled from 'src/styled-components'

const Wrapper = styled.TouchableOpacity`
  width: ${styles.COL2_WIDTH}px;
`

const AlbumImage = styled(Image)`
  height: ${styles.COL2_WIDTH}px;
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

const AlbumItem: React.FC<Props> = ({ item, onPress }) => {
  const { cover, title, author } = item
  const handlePress = React.useCallback(() => {
    if (onPress) {
      onPress(item)
    }
  }, [onPress, item])

  const source = useImageSource(cover, NoAvatarSizeNames.S_160)

  return (
    <Wrapper onPress={handlePress} testID="albumItem">
      <AlbumImage source={source} />
      <TitleText>{title}</TitleText>
      <SubTitleText>{author}</SubTitleText>
    </Wrapper>
  )
}

export default AlbumItem
