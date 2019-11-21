import L from 'lodash'
import React from 'react'
import { Track, Album } from 'src/apollo'
import {
  AlbumItem,
  TracksView,
  ScrollView,
  SectionHeader,
  RefreshControl,
} from 'src/components'
import { ToggleTrackProps, DetailedTrackMenuProps } from 'src/HOCs'
import { formatTracksCount, formatTimeDurationForPlaylist } from 'src/helpers'
import styled from 'src/styled-components'

const AlbumsWrapper = styled.View`
  padding: 12px 16px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`

const Divider = styled.View`
  height: 12px;
`

const Col = styled.View`
  margin-bottom: 24px;
`

interface Props extends ToggleTrackProps, DetailedTrackMenuProps {
  tracks: Track[]
  albums: Album[]
  playlistKey: string
  tracksTitle: string
  albumTitle: string
  isRefreshing: boolean
  onRefresh: () => void
  onPressAlbum: (album: Album) => void
  onPressAlbumsHeader: () => void
  onPressTracksHeader: () => void
}

class LikedMusic extends React.Component<Props> {
  private renderTracks = (): React.ReactNode => {
    const {
      tracks,
      isPlaying,
      toggleTrack,
      tracksTitle,
      activeTrack,
      playlistKey,
      showDetailedTrack,
      onPressTracksHeader,
    } = this.props

    if (!tracks.length) {
      return null
    }

    const tracksInfo = this.getTracksInfo()

    return (
      <>
        <SectionHeader
          title={tracksTitle}
          onPress={onPressTracksHeader}
          rightText={tracksInfo}
        />

        <TracksView
          showDetailedTrack={showDetailedTrack}
          toggleTrack={toggleTrack}
          activeTrack={activeTrack}
          playlistKey={playlistKey}
          isPlaying={isPlaying}
          tracks={tracks}
        />
      </>
    )
  }

  private getTracksInfo = (): string => {
    const { tracks } = this.props

    const count = formatTracksCount(tracks.length)
    if (!tracks.length) {
      return count
    }

    const fullLength: number = L.sumBy(tracks, 'length')
    if (!fullLength) {
      return count
    }

    const formattedTime = formatTimeDurationForPlaylist(fullLength, {
      useShortSyntax: true,
    })

    return `${count}, ${formattedTime}`
  }

  private renderAlbums = (): React.ReactNode => {
    const { albums, albumTitle, onPressAlbum, onPressAlbumsHeader } = this.props

    if (!albums.length) {
      return null
    }

    return (
      <>
        <SectionHeader title={albumTitle} onPress={onPressAlbumsHeader} />

        <AlbumsWrapper>
          {albums.map(album => (
            <Col key={album.id.toString()}>
              <AlbumItem onPress={onPressAlbum} item={album} />
            </Col>
          ))}
        </AlbumsWrapper>
      </>
    )
  }

  render() {
    const { isRefreshing, onRefresh } = this.props
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        noHorizontalPadding
      >
        {this.renderTracks()}
        <Divider />
        {this.renderAlbums()}
      </ScrollView>
    )
  }
}

export default LikedMusic
