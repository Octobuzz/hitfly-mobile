import React, { useCallback } from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { View, Stretcher, TextBase, SafeView } from 'src/components'
import { PlayerSlider } from 'src/containers'
import { ToggleTrackProps } from 'src/HOCs'
import Cover from './Cover'
import Controls from './Controls'
import BottomControls from './BottomControls'
import { routes } from 'src/constants'
import { Track } from 'src/apollo'
import styled from 'src/styled-components'

const Wrapper = styled(SafeView)`
  background-color: ${({ theme }) => theme.colors.black};
`

const TitleText = styled(TextBase)`
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.white};
  font-size: 24px;
  line-height: 28px;
`

const SubTitleText = styled(TextBase)`
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  font-size: 16px;
`

interface Props extends ToggleTrackProps, NavigationStackScreenProps {
  addTrackToFavorites: (track: Track) => void
}

const ModalPlayer: React.FC<Props> = ({
  addTrackToFavorites,
  activeTrack,
  navigation,
  screenProps,
  theme,
  ...toggleTrackProps
}) => {
  const {
    title,
    group,
    singer,
    isFavorite,
    favouritesCount,
    cover: [{ imageUrl }],
  } = activeTrack!

  const navigateToPlaylist = useCallback(() => {
    navigation.navigate(routes.PLAYER.MODAL_PLAYLIST)
  }, [])

  const handlePressLikeTrack = useCallback(() => {
    addTrackToFavorites(activeTrack!)
  }, [activeTrack, addTrackToFavorites])

  return (
    <Wrapper>
      <View addTopNavigationHeaderPadding>
        <Cover source={{ uri: imageUrl }} />
        <Stretcher />
        <TitleText>{title}</TitleText>
        <SubTitleText>{group ? group.title : singer}</SubTitleText>
        <Stretcher gravity={3} />
        <Controls {...toggleTrackProps} />
        <Stretcher gravity={3} />
      </View>
      <PlayerSlider />
      <BottomControls
        onPressLike={handlePressLikeTrack}
        onPressPlaylist={navigateToPlaylist}
        isLiked={isFavorite}
        likesCount={favouritesCount}
      />
    </Wrapper>
  )
}

export default ModalPlayer
