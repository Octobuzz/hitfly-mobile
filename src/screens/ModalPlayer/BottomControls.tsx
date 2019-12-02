import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { TextBase } from 'src/components'
import styled from 'src/styled-components'

const Row = styled.View`
  padding: 50px 20px 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`

const Text = styled(TextBase)`
  font-size: 16px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.white};
`

const ControlWrapper = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.8,
}))`
  flex-direction: row;
  align-items: center;
`

const ControlIcon = styled(Icon).attrs(({ theme }) => ({
  color: theme.colors.white,
  size: 30,
}))``

// @ts-ignore
const LikeIcon = styled(Icon).attrs(({ theme, isActive }) => ({
  color: isActive ? theme.colors.brandPink : theme.colors.white,
  size: 20,
}))<{ isActive: boolean }>`
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
      <ControlIcon name="shuffle-variant" />
    </ControlWrapper>
    <ControlWrapper onPress={onPressLike}>
      <Text>
        <LikeIcon isActive={isLiked} name="heart" /> {likesCount}
      </Text>
    </ControlWrapper>
    <ControlWrapper onPress={onPressPlaylist}>
      <ControlIcon name="playlist-music" />
    </ControlWrapper>
  </Row>
)

export default BottomControls
