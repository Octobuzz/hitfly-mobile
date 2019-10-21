import React from 'react'
import { ViewStyle } from 'react-native'
import TextBase from './TextBase'
import { Image } from './Image'
import { helpers } from 'src/utils'
import { Collection } from 'src/apollo'
import styled from 'src/styled-components'

const ItemWrapper = styled.TouchableOpacity<Sized>`
  height: ${({ height }) => height || 160}px;
  width: ${({ width }) => width || 164}px;
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

const TopText = styled(props => <TextBase {...props} />)`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.textWhite};
  font-size: 12px;
`

const BottomText = styled(props => <TextBase {...props} />)`
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
  const handlePress = React.useCallback(() => {
    if (collection) {
      onPress(collection)
    }
  }, [onPress, collection])

  const { tracksCountInPlaylist, title, image } = collection
  const bottomText = helpers.formatTracksCount(tracksCountInPlaylist)
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
