import L from 'lodash'
import React from 'react'
import { Dimensions } from 'react-native'
import { Track, Album } from 'src/apollo'
import {
  ScrollView,
  H1,
  TextBase,
  TracksView,
  AlbumItem,
  RefreshControl,
} from 'src/components'
import { ToggleTrackProps, DetailedTrackMenuProps } from 'src/containers/HOCs'
import { helpers } from 'src/utils'
import styled from 'src/styled-components'

const HeaderWrapper = styled.View`
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 16px;
  padding-horizontal: 16px;
`

const InfoText = styled(TextBase)`
  color: ${({ theme }) => theme.colors.textGray};
  font-size: 12px;
`

const AlbumsWrapper = styled.View`
  padding-horizontal: 16px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`

// минус паддинг по бокам и между колонками
const COLUMN_WIDH = Dimensions.get('window').width - 48

const Col = styled.View`
  width: ${Math.trunc(COLUMN_WIDH / 2)}px;
  margin-bottom: 24px;
`

interface Props extends ToggleTrackProps, DetailedTrackMenuProps {
  tracks: Track[]
  albums: Album[]
  tracksTitle: string
  albumTitle: string
  refreshing: boolean
  onRefresh: () => void
}

class LikedMusic extends React.Component<Props> {
  private renderTracks = (): React.ReactNode => {
    const {
      tracks,
      toggleTrack,
      activeTrack,
      showDetailedTrack,
      tracksTitle,
    } = this.props

    if (!tracks.length) {
      return null
    }

    const tracksInfo = this.getTracksInfo()

    return (
      <>
        <HeaderWrapper>
          <H1>{tracksTitle}</H1>
          <InfoText>{tracksInfo}</InfoText>
        </HeaderWrapper>

        <TracksView
          showDetailedTrack={showDetailedTrack}
          toggleTrack={toggleTrack}
          activeTrack={activeTrack}
          tracks={tracks}
        />
      </>
    )
  }

  private getTracksInfo = (): string => {
    const { tracks } = this.props

    const count = helpers.formatTracksCount(tracks.length)
    if (!tracks.length) {
      return count
    }

    const fullLength: number = L.sumBy(tracks, 'length')
    if (!fullLength) {
      return count
    }

    const formattedTime = helpers.formatTimeDurationForPlaylist(fullLength, {
      useShortSyntax: true,
    })

    return `${count}, ${formattedTime}`
  }

  private renderAlbums = (): React.ReactNode => {
    const { albums, albumTitle } = this.props

    if (!albums.length) {
      return null
    }

    return (
      <>
        <HeaderWrapper>
          <H1>{albumTitle}</H1>
        </HeaderWrapper>

        <AlbumsWrapper>
          {albums.map(album => (
            <Col key={album.id.toString()}>
              <AlbumItem item={album} />
            </Col>
          ))}
        </AlbumsWrapper>
      </>
    )
  }

  render() {
    const { refreshing, onRefresh } = this.props
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        noHorizontalPadding
        addBottomSafePadding
      >
        {this.renderTracks()}
        {this.renderAlbums()}
      </ScrollView>
    )
  }
}

export default LikedMusic
