import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Track } from 'src/apollo'
import { Playable } from './interfaces'
import { CenterBlock, TitleWhiteText, SubTitleWhiteText } from './styles'
import TrackImage from './TrackImage'
import { styles } from 'src/constants'
import styled from 'src/styled-components'

const Wrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
`

// @ts-ignore
const LikeIcon = styled(Icon).attrs(({ theme, isActive }) => ({
  color: isActive ? theme.colors.brandPink : theme.colors.white,
  size: 20,
  name: 'heart',
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
        <TitleWhiteText numberOfLines={1}>{title}</TitleWhiteText>
        <SubTitleWhiteText numberOfLines={1}>
          {group ? group.title : singer}
        </SubTitleWhiteText>
      </CenterBlock>
      <LikeWrapper onPress={handlePressLike}>
        <LikeIcon isActive={track.isFavorite} />
      </LikeWrapper>
    </Wrapper>
  )
}

export default TrackWithLikes
