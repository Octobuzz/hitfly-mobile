import React, { useMemo, useCallback } from 'react'
import { ViewStyle } from 'react-native'
import TextBase from './TextBase'
import { Image } from './Image'
import { formatTracksCount } from 'src/helpers'
import { Collection } from 'src/apollo'
import { styles } from 'src/constants'
import styled from 'src/styled-components'

const ItemWrapper = styled.TouchableOpacity<Sized>`
  height: ${({ height }) => height || styles.COL2_WIDTH}px;
  width: ${({ width }) => width || styles.COL2_WIDTH}px;
  padding: 16px;
  align-items: flex-end;
  justify-content: space-between;
  border-radius: 4px;
  overflow: hidden;
`

const BackgroundImage = styled(Image).attrs(() => ({
  resizeMode: 'cover',
}))`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`

const TopText = styled(TextBase)`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.textWhite};
  font-size: 12px;
`

const BottomText = styled(TextBase)`
  color: ${({ theme }) => theme.colors.textWhite};
  font-size: 12px;
`

interface Sized {
  width?: number
  height?: number
}

interface CollectionItemProps extends Sized {
  onPress: (collection: Collection) => void
  collection: Collection
  style?: ViewStyle
}

const CollectionItem: React.FC<CollectionItemProps> = ({
  collection,
  onPress,
  style,
  width,
  height,
}) => {
  const handlePress = useCallback(() => {
    if (collection) {
      onPress(collection)
    }
  }, [onPress, collection])

  const { tracksCountInPlaylist, title, image } = collection
  const bottomText = useMemo(() => formatTracksCount(tracksCountInPlaylist), [
    tracksCountInPlaylist,
  ])
  return (
    <ItemWrapper
      style={style}
      width={width}
      height={height}
      onPress={handlePress}
    >
      <BackgroundImage source={{ uri: image[0].imageUrl }} />
      <TopText>{title}</TopText>
      <BottomText>{bottomText}</BottomText>
    </ItemWrapper>
  )
}

export default CollectionItem
