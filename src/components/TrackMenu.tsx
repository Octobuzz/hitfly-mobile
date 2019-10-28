import React from 'react'
import { Image, View, Button } from 'src/components'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Track } from 'src/apollo'
import styled from 'src/styled-components'
import TextBase from './TextBase'

export const TRACK_MENU_HEIGHT = 300

const TrackWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`

const StyledImage = styled(Image)`
  width: 32px;
  height: 32px;
  border-radius: 4px;
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

const StyledIcon = styled(Icon).attrs(({ theme }) => ({
  color: theme.colors.white,
  size: 14,
}))`
  margin-right: 11px;
  text-align: center;
  width: 32px;
`

const MenuItemText = styled(TextBase)`
  font-size: 14px;
  line-height: 14px;
  color: ${({ theme }) => theme.colors.white};
`

interface Props {
  track?: Track
  onPressLike?: () => void
  onPressEdit?: () => void
  onPressCancel?: () => void
}

const TrackMenu: React.FC<Props> = ({
  track,
  onPressLike,
  onPressEdit,
  onPressCancel,
}) => {
  if (!track) {
    return null
  }
  const { cover, group, singer, title } = track
  return (
    <View paddingBottom={32} noFill testID="like">
      <TrackWrapper>
        <StyledImage source={{ uri: cover[0].imageUrl }} />
        <CenterBlock>
          <TitleText>{title}</TitleText>
          <SubtitleText>{group ? group.title : singer}</SubtitleText>
        </CenterBlock>
      </TrackWrapper>
      <Divider />
      <MenuItem onPress={onPressLike} accessibilityRole="summary">
        <StyledIcon name="heart-o" />
        <MenuItemText>Понравилось</MenuItemText>
      </MenuItem>
      <MenuItem onPress={onPressEdit} accessibilityRole="summary">
        <StyledIcon name="edit" />
        <MenuItemText testID="like">Редактировать</MenuItemText>
      </MenuItem>
      <Button onPress={onPressCancel} title="Отмена" type="outline-black" />
    </View>
  )
}

export default TrackMenu
