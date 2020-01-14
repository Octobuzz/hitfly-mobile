import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { TextBase } from 'src/components'
import { images } from 'src/constants'
import styled from 'src/styled-components'

const Row = styled.View`
  padding: 50px 20px 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`

const Text = styled(TextBase)`
  font-size: 16px;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.white};
`

const ControlWrapper = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.8,
}))`
  flex-direction: row;
  align-items: baseline;
`

const ShuffleIcon = styled.Image.attrs(() => ({
  source: images.SHUFFLE,
}))`
  tint-color: ${({ theme }) => theme.colors.white};
`

const ControlIcon = styled(Icon).attrs(({ theme }) => ({
  color: theme.colors.white,
  size: 30,
}))``

const LikeIcon = styled.Image.attrs(() => ({
  source: images.HEART,
}))<{ isActive: boolean }>`
  overflow: visible;
  ${({ isActive, theme }) =>
    !isActive && `tint-color: ${theme.colors.textWhite}`}
  margin-right: 8px;
`

interface Props {
  onPressShuffle: () => void
  onPressPlaylist: () => void
  onPressLike: () => void
  isLiked: boolean
  likesCount: number
}

const BottomControls: React.FC<Props> = ({
  isLiked,
  onPressLike,
  onPressShuffle,
  onPressPlaylist,
  likesCount = 0,
}) => (
  <Row>
    <ControlWrapper onPress={onPressShuffle}>
      <ShuffleIcon />
    </ControlWrapper>
    <ControlWrapper onPress={onPressLike}>
      <LikeIcon isActive={isLiked} />
      <Text>{likesCount}</Text>
    </ControlWrapper>
    <ControlWrapper onPress={onPressPlaylist}>
      <ControlIcon name="playlist-music" />
    </ControlWrapper>
  </Row>
)

export default BottomControls
