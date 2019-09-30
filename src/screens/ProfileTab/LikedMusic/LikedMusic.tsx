import React from 'react'
import { Track, Collection } from 'src/apollo'
import { ScrollView } from 'src/components'
import { TracksList } from 'src/containers'
import styled from 'src/styled-components'

interface Props {
  tracks: Track[]
  albums: Collection[]
}

interface State {
  selectedTrack?: Track
}

class LikedMusic extends React.Component<Props, State> {
  private renderTracks = (): React.ReactNode => {
    const { tracks } = this.props

    if (!tracks.length) {
      return null
    }

    return <TracksList tracks={tracks} />
  }

  render() {
    const { tracks } = this.props
    return <ScrollView addBottomSafePadding>{this.renderTracks()}</ScrollView>
  }
}

export default LikedMusic
