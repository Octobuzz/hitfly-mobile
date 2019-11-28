import React from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import { Track } from 'src/apollo'
import { ToggleTrackProps, DetailedTrackMenuProps } from 'src/HOCs'
import PlaylistTrack from './PlaylistTrack'
import RefreshControl from './RefreshControl'
import { ListFooterLoader } from './Loader'
import styled from 'src/styled-components'
import TextBase from './TextBase'

interface Props extends ToggleTrackProps, DetailedTrackMenuProps {
  tracks: Track[]
  playlistTitle: string
  playlistKey: string
  onRefresh: () => void
  onEndReached: () => void
  isRefreshing: boolean
  isFetchingMore: boolean
}

const ListEmptyText = styled(TextBase)`
  color: ${({ theme }) => theme.colors.textAlt};
  text-align: center;
  padding-vertical: 50px;
`

const Scroll = styled(FlatList as new () => FlatList<Track>).attrs(() => ({
  initialNumToRender: 10,
}))`
  flex: 1;
`

class TracksList extends React.Component<Props> {
  private renderTrack: ListRenderItem<Track> = ({ item, index }) => {
    const { showDetailedTrack } = this.props
    const isPlaying = this.isTrackPlaying(item)
    return (
      <PlaylistTrack
        index={index}
        isPlaying={isPlaying}
        onPress={this.handlePressTrack}
        onPressMore={showDetailedTrack}
        track={item}
      />
    )
  }

  private handlePressTrack = (track: Track) => {
    const { toggleTrack, tracks, playlistKey } = this.props
    toggleTrack({ track, playlistData: { playlist: tracks, playlistKey } })
  }

  private isTrackPlaying = (track: Track): boolean => {
    const { activeTrack, isPlaying } = this.props
    if (!activeTrack || !isPlaying) {
      return false
    }
    return activeTrack.id === track.id
  }

  private getItemLayout = (
    _: any,
    index: number,
  ): { length: number; offset: number; index: number } => {
    const length = PlaylistTrack.size
    return {
      length,
      offset: length * index,
      index,
    }
  }

  render() {
    const {
      tracks,
      playlistTitle,
      isFetchingMore,
      isRefreshing,
      onEndReached,
      onRefresh,
    } = this.props
    return (
      <Scroll
        data={tracks}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.9}
        ListFooterComponent={<ListFooterLoader isShown={isFetchingMore} />}
        ListEmptyComponent={
          <ListEmptyText>{`Плейлист "${playlistTitle}" пуст`}</ListEmptyText>
        }
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        getItemLayout={this.getItemLayout}
        renderItem={this.renderTrack}
      />
    )
  }
}

export default TracksList
