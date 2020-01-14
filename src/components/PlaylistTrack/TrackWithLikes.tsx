import React from 'react'
import { Track, NoAvatarSizeNames } from 'src/apollo'
import { Playable } from './interfaces'
import { CenterBlock, TitleWhiteText, SubTitleWhiteText } from './styles'
import TrackImage from './TrackImage'
import { styles, images } from 'src/constants'
import { useImageSource } from 'src/hooks'
import styled from 'src/styled-components'

const Wrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
`

const LikeIcon = styled.Image.attrs(() => ({
  source: images.HEART,
}))<{ isActive: boolean }>`
  overflow: visible;
  ${({ isActive, theme }) =>
    !isActive && `tintColor: ${theme.colors.textWhite}`}
`

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
  const { cover, title, singer } = track

  const handlePressTrack = React.useCallback(() => {
    onPress(track)
  }, [onPress, track])

  const handlePressLike = React.useCallback(() => {
    onPressLike(track)
  }, [onPressLike, track])

  const source = useImageSource(cover, NoAvatarSizeNames.S_32)

  return (
    <Wrapper onPress={handlePressTrack}>
      <TrackImage isPlaying={isPlaying} imageUrl={source.uri} />
      <CenterBlock>
        <TitleWhiteText numberOfLines={1}>{title}</TitleWhiteText>
        <SubTitleWhiteText numberOfLines={1}>{singer}</SubTitleWhiteText>
      </CenterBlock>
      <LikeWrapper onPress={handlePressLike}>
        <LikeIcon isActive={track.isFavorite} />
      </LikeWrapper>
    </Wrapper>
  )
}

export default TrackWithLikes
