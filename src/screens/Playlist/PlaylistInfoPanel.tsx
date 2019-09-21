import L from 'lodash'
import React from 'react'
import { ViewStyle } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { TextBase } from 'src/components'
import { Playlist } from 'src/apollo'
import { helpers } from 'src/utils'
import styled from 'src/styled-components'

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 16px 16px 0px;
`

const Text = styled(TextBase)`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textAlt};
`

const FullText = styled(Text)`
  flex: 1;
`

const HeartIcon = styled(Icon).attrs(({ theme }) => ({
  color: theme.colors.textMain,
  size: 12,
  name: 'heart',
}))`
  margin-right: 8px;
`

interface Props {
  style?: ViewStyle
  playlist: Playlist
  favouriteCount: number
}

const PlaylistInfoPanel: React.FC<Props> = ({
  style,
  playlist,
  favouriteCount,
}) => {
  const playlistInfo = React.useMemo(() => {
    const count = helpers.formatTracksCount(playlist.length)
    if (!playlist.length) {
      return count
    }
    const fullLength: number = L.sumBy(playlist, 'length')
    if (!fullLength) {
      return count
    }
    const formattedTime = helpers.formatTimeDurationForPlaylist(fullLength)
    return `${count}, ${formattedTime}`
  }, [playlist])

  return (
    <Wrapper style={style}>
      <FullText>{playlistInfo}</FullText>
      <Text>
        <HeartIcon /> {favouriteCount}
      </Text>
    </Wrapper>
  )
}

export default PlaylistInfoPanel
