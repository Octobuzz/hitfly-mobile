import React from 'react'
import FastImage, { FastImageSource } from 'react-native-fast-image'
import ShuffleButton from './ShuffleButton'
import { Track } from 'src/apollo'
import styled from 'src/styled-components'

const CoverWrapper = styled.View`
  height: 45%;
  justify-content: flex-end;
  background-color: ${({ theme }) => theme.colors.white};
`

const Cover = styled(FastImage)`
  border-bottom-left-radius: 28px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const PositionedShuffleButton = styled(ShuffleButton)`
  align-self: flex-end;
  width: 80%;
`

interface Props {
  cover: FastImageSource | number
  tracks: Track[]
  favouriteCount: number
}

class Playlist extends React.Component<Props> {
  render() {
    const { cover } = this.props
    return (
      <CoverWrapper>
        <Cover source={cover} />
        <PositionedShuffleButton />
      </CoverWrapper>
    )
  }
}

export default Playlist
