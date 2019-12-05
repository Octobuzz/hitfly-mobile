import React, { useCallback } from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import { Track } from 'src/apollo'
import { ToggleTrackProps } from 'src/HOCs'
import { TrackActionsProps } from 'src/hooks'
import { TrackWithLikes, View } from 'src/components'
import { styles } from 'src/constants'
import styled from 'src/styled-components'

const Wrapper = styled(View).attrs(() => ({
  addBottomSafePadding: true,
  addTopNavigationHeaderPadding: true,
  noHorizontalPadding: true,
}))`
  background-color: ${({ theme }) => theme.colors.black};
`

const Scroll = styled(FlatList as new () => FlatList<Track>).attrs(() => ({
  initialNumToRender: 20,
  contentContainerStyle: {
    paddingHorizontal: styles.VIEW_HORIZONTAL_INDENTATION,
  },
}))`
  flex: 1;
`

interface Props extends ToggleTrackProps, TrackActionsProps {}

const ModalPlaylist: React.FC<Props> = ({
  isPlaying,
  activeTrack,
  toggleTrack,
  activePlaylist,
  toggleTrackToFavorites,
}) => {
  const handlePressTrack = useCallback(
    (track: Track) => {
      toggleTrack({ track })
    },
    [toggleTrack],
  )

  const isTrackPlaying = useCallback(
    (track: Track): boolean => {
      if (!activeTrack || !isPlaying) {
        return false
      }
      return activeTrack.id === track.id
    },
    [activeTrack, isPlaying],
  )

  const renderTrack: ListRenderItem<Track> = useCallback(
    ({ item }) => (
      <TrackWithLikes
        isPlaying={isTrackPlaying(item)}
        onPress={handlePressTrack}
        onPressLike={toggleTrackToFavorites}
        track={item}
      />
    ),
    [toggleTrackToFavorites, isTrackPlaying],
  )

  return (
    <Wrapper>
      <Scroll data={activePlaylist!} renderItem={renderTrack} />
    </Wrapper>
  )
}

export default ModalPlaylist
