import L from 'lodash'
import React from 'react'
import { Track, Album } from 'src/apollo'
import { ScrollView, H1, TextBase, TracksView } from 'src/components'
import { ToggleTrackProps, DetailedTrackMenuProps } from 'src/containers/HOCs'
import { helpers } from 'src/utils'
import styled from 'src/styled-components'

const HeaderWrapper = styled.View`
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 16px;
`

const InfoText = styled(TextBase)`
  color: ${({ theme }) => theme.colors.textGray};
  font-size: 12px;
`

interface Props extends ToggleTrackProps, DetailedTrackMenuProps {
  tracks: Track[]
  albums: Album[]
}

class LikedMusic extends React.Component<Props> {
  private renderTracks = (): React.ReactNode => {
    const { tracks, toggleTrack, activeTrack, showDetailedTrack } = this.props

    if (!tracks.length) {
      return null
    }

    const tracksInfo = this.getTracksInfo()

    return (
      <>
        <HeaderWrapper>
          <H1>Любимые песни</H1>
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

  render() {
    const { tracks } = this.props
    return <ScrollView addBottomSafePadding>{this.renderTracks()}</ScrollView>
  }
}

export default LikedMusic
