import L from 'lodash'
import React from 'react'
import { ViewStyle } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { TextBase } from 'src/components'
import { Playlist } from 'src/apollo'
import { formatTracksCount, formatTimeDurationForPlaylist } from 'src/helpers'
import { images, styles } from 'src/constants'
import styled from 'src/styled-components'

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 16px;
`

const Text = styled(TextBase)`
  font-size: 12px;
  line-height: 12px;
  color: ${({ theme }) => theme.colors.textAlt};
`

const FullText = styled(Text)`
  flex: 1;
`

const LikesWrapper = styled.View`
  flex-direction: row;
  align-items: baseline;
`

const HeartIcon = styled(Icon).attrs(({ theme }) => ({
  color: theme.colors.textAlt,
  size: 16,
  name: 'heart',
}))`
  margin-right: 8px;
`

const ShuffleIcon = styled.Image.attrs(() => ({
  source: images.SHUFFLE,
}))`
  tint-color: ${({ theme }) => theme.colors.textMain};
`

const ShuffleIconWrapper = styled.TouchableOpacity.attrs(() => ({
  hitSlop: styles.HIT_SLOP,
}))`
  margin-left: 32px;
`

interface Props {
  style?: ViewStyle
  playlist: Playlist
  onPressShuffle: () => void
  favouritesCount: number
}

const PlaylistInfoPanel: React.FC<Props> = ({
  style,
  playlist,
  onPressShuffle,
  favouritesCount,
}) => {
  const playlistInfo = React.useMemo(() => {
    const count = formatTracksCount(playlist.length)
    if (!playlist.length) {
      return count
    }
    const fullLength: number = L.sumBy(playlist, 'length')
    if (!fullLength) {
      return count
    }
    const formattedTime = formatTimeDurationForPlaylist(fullLength, {
      withSeconds: false,
    })
    return `${count}, ${formattedTime}`
  }, [playlist])

  return (
    <Wrapper style={style}>
      <FullText>{playlistInfo}</FullText>
      <LikesWrapper>
        <HeartIcon />
        <Text>{favouritesCount}</Text>
      </LikesWrapper>
      <ShuffleIconWrapper onPress={onPressShuffle}>
        <ShuffleIcon />
      </ShuffleIconWrapper>
    </Wrapper>
  )
}

export default PlaylistInfoPanel
