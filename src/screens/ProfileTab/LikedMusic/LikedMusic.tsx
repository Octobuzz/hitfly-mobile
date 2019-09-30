import React from 'react'
import { Track, Collection } from 'src/apollo'
import { ScrollView, TrackMenu, SlidingPanel } from 'src/components'
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
    return null
  }

  render() {
    const { tracks } = this.props
    return <ScrollView>{}</ScrollView>
  }
}

export default LikedMusic
