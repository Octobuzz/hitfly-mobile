import React, { useCallback } from 'react'
import Button from './buttons/Button'
import { Image } from './Image'
import View from './views/View'
import TextBase from './TextBase'
import { Track, NoAvatarSizeNames } from 'src/apollo'
import { useImageSource } from 'src/hooks'
import { images } from 'src/constants'
import styled from 'src/styled-components'

const TrackWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`

const StyledImage = styled(Image)`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  margin-bottom: 4px;
`

const CenterBlock = styled.View`
  flex: 1;
  margin-horizontal: 16px;
`
const TitleText = styled(TextBase)`
  font-size: 12px;
  line-height: 14px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.white};
`

const SubtitleText = styled(TextBase)`
  font-size: 10px;
  line-height: 12px;
  opacity: 0.6;
  color: ${({ theme }) => theme.colors.white};
`

const Divider = styled.View`
  height: 1px;
  margin-top: 24px;
  margin-bottom: 34px;
  background-color: ${({ theme }) => theme.colors.transparentWhite50};
`

export const MenuItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: 34px;
`

const LikeIcon = styled.Image.attrs(() => ({
  source: images.HEART,
}))<{ isActive: boolean }>`
  overflow: visible;
  ${({ isActive, theme }) =>
    !isActive && `tint-color: ${theme.colors.textWhite}`}
`

const IconWrapper = styled.View`
  width: 30px;
  justify-content: center;
  align-items: center;
  margin-right: 11px;
`

const MenuItemText = styled(TextBase)`
  font-size: 14px;
  line-height: 14px;
  color: ${({ theme }) => theme.colors.textWhite};
`

export interface TrackMenuProps {
  track: Track
  onPressLike: (track: Track) => void
  onPressCancel?: () => void
}

const TrackMenu: React.FC<TrackMenuProps> = ({
  track,
  onPressLike,
  onPressCancel,
}) => {
  const handlePressLike = useCallback(() => {
    onPressLike(track)
  }, [onPressLike, track])
  const { cover, singer, title } = track

  const source = useImageSource(cover, NoAvatarSizeNames.S_32)

  return (
    <View paddingBottom={32} noFill testID="like">
      <TrackWrapper>
        <StyledImage source={source} />
        <CenterBlock>
          <TitleText>{title}</TitleText>
          <SubtitleText>{singer}</SubtitleText>
        </CenterBlock>
      </TrackWrapper>
      <Divider />
      <MenuItem onPress={handlePressLike} testID="summary">
        <IconWrapper>
          <LikeIcon isActive={track.isFavorite} />
        </IconWrapper>
        <MenuItemText>Понравилось</MenuItemText>
      </MenuItem>
      <Button onPress={onPressCancel} title="Отмена" type="outline-black" />
    </View>
  )
}

export default TrackMenu
