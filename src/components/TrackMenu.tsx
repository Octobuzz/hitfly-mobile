import React, { useCallback } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import Button from './buttons/Button'
import { Image } from './Image'
import View from './views/View'
import TextBase from './TextBase'
import { Track, NoAvatarSizeNames } from 'src/apollo'
import { useImageSource } from 'src/hooks'
import styled from 'src/styled-components'

const TrackWrapper = styled.View``

// под размеры меню: 200 - 16 - 16
// может стоит завести константы?
const StyledImage = styled(Image)`
  width: 168px;
  height: 168px;
  border-radius: 4px;
  margin-bottom: 4px;
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

const StyledIcon = styled(Icon).attrs<{ isActive: boolean }>(
  ({ theme, isActive }) => ({
    color: isActive ? theme.colors.brandPink : theme.colors.white,
    size: 14,
  }),
)<{ isActive: boolean }>`
  margin-right: 11px;
  text-align: center;
  width: 32px;
`

const MenuItemText = styled(TextBase)`
  font-size: 14px;
  line-height: 14px;
  color: ${({ theme }) => theme.colors.white};
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

  const source = useImageSource(cover, NoAvatarSizeNames.S_235)

  return (
    <View paddingBottom={32} noFill testID="like">
      <TrackWrapper>
        <StyledImage source={source} />
        <TitleText>{title}</TitleText>
        <SubtitleText>{singer}</SubtitleText>
      </TrackWrapper>
      <Divider />
      <MenuItem onPress={handlePressLike} testID="summary">
        <StyledIcon isActive={track.isFavorite} name="heart-o" />
        <MenuItemText>Понравилось</MenuItemText>
      </MenuItem>
      <Button onPress={onPressCancel} title="Отмена" type="outline-black" />
    </View>
  )
}

export default TrackMenu
