import React, { useCallback } from 'react'
import { ViewStyle } from 'react-native'
import { Image } from './Image'
import { Collection, NoAvatarSizeNames } from 'src/apollo'
import { useImageSource } from 'src/hooks'
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

  const { image } = collection

  const source = useImageSource(image, NoAvatarSizeNames.S_160)

  return (
    <ItemWrapper
      style={style}
      width={width}
      height={height}
      onPress={handlePress}
    >
      <BackgroundImage source={source} />
    </ItemWrapper>
  )
}

export default CollectionItem
