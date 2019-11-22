import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Track } from 'src/apollo'
import { Playable } from './interfaces'
import TextBase from '../TextBase'
import TrackImage from './TrackImage'
import { styles } from 'src/constants'
import styled from 'src/styled-components'

const VERTICAL_PADDING = 16

const Wrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 12px ${VERTICAL_PADDING}px;
`

const CenterBlock = styled.View`
  flex: 1;
  margin-horizontal: 16px;
`

const TitleText = styled(TextBase)`
  font-size: 12px;
  line-height: 14px;
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.bold};
`

const SubTitleText = styled(TextBase)`
  font-size: 10px;
  line-height: 12px;
  color: ${({ theme }) => theme.colors.white};
`

// @ts-ignore
const LikeIcon = styled(Icon).attrs(({ theme, isActive }) => ({
  color: isActive ? theme.colors.brandPink : theme.colors.white,
  size: 24,
}))<{ isActive: boolean }>``

const LikeWrapper = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.8,
  hitSlop: styles.HIT_SLOP,
}))``

export interface TrackWithLikesProps extends Playable {
  onPress: (track: Track) => void
  onPressLike: (track: Track) => void
  track: Track
}

const TrackWithLikes: React.FC<TrackWithLikesProps> = ({
  track,
  onPress,
  isPlaying,
  onPressLike,
}) => {
  const { cover, title, group, singer } = track

  const handlePressTrack = React.useCallback(() => {
    onPress(track)
  }, [onPress, track])

  const handlePressLike = React.useCallback(() => {
    onPressLike(track)
  }, [onPressLike, track])

  return (
    <Wrapper onPress={handlePressTrack}>
      <TrackImage isPlaying={isPlaying} imageUrl={cover[0].imageUrl} />
      <CenterBlock>
        <TitleText numberOfLines={2}>{title}</TitleText>
        <SubTitleText numberOfLines={2}>
          {group ? group.title : singer}
        </SubTitleText>
      </CenterBlock>
      <LikeWrapper onPress={handlePressLike}>
        <LikeIcon isAtive={track.isFavorite} />
      </LikeWrapper>
    </Wrapper>
  )
}

export default TrackWithLikes
