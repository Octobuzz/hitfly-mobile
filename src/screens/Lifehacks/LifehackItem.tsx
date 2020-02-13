import React from 'react'
import { Dimensions } from 'react-native'
import { Lifehack, NoAvatarSizeNames } from 'src/apollo'
import { useImageSource } from 'src/hooks'
import { Image, Stretcher, TextBase } from 'src/components'
import { styles, images } from 'src/constants'
import styled from 'src/styled-components'

const { width } = Dimensions.get('window')
const IMAGE_SIZE = width - styles.VIEW_HORIZONTAL_INDENTATION * 2

const Wrapper = styled.TouchableOpacity``

const BottomRow = styled.View`
  flex-direction: row;
  padding-top: 21px;
  padding-bottom: 8px;
`

const Icon = styled.Image.attrs(() => ({
  resizeMode: 'contain',
}))<{ isActive?: boolean }>`
  ${({ isActive, theme }) =>
    !isActive && `tint-color: ${theme.colors.textMain};`}
`

const LikeText = styled(TextBase)`
  font-size: 12px;
  line-height: 12px;
  margin-left: 8px;
`

const IconWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: baseline;
  padding-horizontal: 8px;
`

const LifehackImage = styled(Image)<{ size?: number }>`
  width: ${({ size }) => size || IMAGE_SIZE}px;
  height: ${({ size }) => size || IMAGE_SIZE}px;
  border-radius: 4px;
`

interface LifehackItemProps {
  lifehack: Lifehack
  size?: number
  onPress?: (lifehack: Lifehack) => void
  onPressLike?: (lifehack: Lifehack) => void
  onPressShare?: (lifehack: Lifehack) => void
  onPressBookmark?: (lifehack: Lifehack) => void
}

const LifehackItem: React.FC<LifehackItemProps> = ({
  size,
  lifehack,
  onPress,
  onPressLike,
  onPressShare,
  onPressBookmark,
}) => {
  const { image, isFavorite, favouritesCount = 0, isBookmarked } = lifehack
  const source = useImageSource(image, NoAvatarSizeNames.S_300)

  return (
    <Wrapper disabled={!onPress} onPress={() => onPress?.(lifehack)}>
      <LifehackImage size={size} source={source} />
      <BottomRow>
        <IconWrapper onPress={() => onPressLike?.(lifehack)}>
          <Icon isActive={isFavorite} source={images.HEART} />
          <LikeText>{favouritesCount}</LikeText>
        </IconWrapper>
        <IconWrapper onPress={() => onPressShare?.(lifehack)}>
          <Icon source={images.SHARE} />
        </IconWrapper>
        <Stretcher />
        <IconWrapper onPress={() => onPressBookmark?.(lifehack)}>
          <Icon isActive={isBookmarked} source={images.BOOKMARK} />
        </IconWrapper>
      </BottomRow>
    </Wrapper>
  )
}

export default LifehackItem
