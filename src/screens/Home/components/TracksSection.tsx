import React from 'react'
import { FlatList } from 'react-native'
import { Track, Playlist } from 'src/apollo'
import { Loader, TextBase, Image } from 'src/components'
import SectionWrapper from './SectionWrapper'
import SectionHeader from './SectionHeader'
import styled from 'src/styled-components'

const ITEM_WIDTH = 164
const ITEM_HEIGHT = 212
const DIVIDER_SIZE = 8

const ItemWrapper = styled.TouchableOpacity`
  width: ${ITEM_WIDTH}px;
`

const BackgroundImage = styled(Image)`
  width: ${ITEM_WIDTH}px;
  height: 160px;
  border-radius: 4px;
`

const TopText = styled(TextBase).attrs(() => ({
  numberOfLines: 1,
}))`
  font-family: ${({ theme }) => theme.fonts.medium};
  margin-top: 10px;
  font-size: 14px;
`

const BottomText = styled(TextBase).attrs(() => ({
  numberOfLines: 1,
}))`
  color: ${({ theme }) => theme.colors.textAlt};
  font-size: 12px;
`

interface TrackItemProps {
  track: Track
  onPress: (track: Track) => void
}

const TrackItem: React.FC<TrackItemProps> = ({ track, onPress }) => {
  const handlePress = React.useCallback(() => {
    if (track) {
      onPress(track)
    }
  }, [onPress, track])
  const { title, cover, singer, group } = track
  const subtitle = group ? group.title : singer
  return (
    <ItemWrapper onPress={handlePress}>
      <BackgroundImage source={{ uri: cover[0].imageUrl }} />
      <TopText>{title}</TopText>
      <BottomText>{subtitle}</BottomText>
    </ItemWrapper>
  )
}

const Column = styled.View`
  flex: 1;
  padding-horizontal: ${DIVIDER_SIZE / 2}px;
`

const ScrollWrapper = styled.View`
  height: ${ITEM_HEIGHT}px;
`

const Scroll = styled(FlatList as new () => FlatList<Track>).attrs(() => ({
  horizontal: true,
  initialNumToRender: 3,
  showsHorizontalScrollIndicator: false,
}))`
  padding-horizontal: 12px;
`

interface Props {
  title: string
  subtitle?: string
  isLoading?: boolean
  playlist: Playlist
  onPressTrack: (track: Track) => void
  onPressHeader: () => void
}

class TracksSection extends React.Component<Props> {
  private keyExtractor = (item: Track): string => item.id.toString()

  private renderPlaylist = ({ item }: { item: Track }): JSX.Element => {
    const { onPressTrack } = this.props
    return (
      <Column>
        <TrackItem onPress={onPressTrack} track={item} />
      </Column>
    )
  }

  private getItemLayout = (
    _: any,
    index: number,
  ): { length: number; offset: number; index: number } => {
    const length = ITEM_WIDTH + DIVIDER_SIZE
    return {
      length,
      offset: length * index,
      index,
    }
  }

  render() {
    const { isLoading, playlist, title, subtitle, onPressHeader } = this.props
    if (!isLoading && !playlist.length) {
      return null
    }
    return (
      <SectionWrapper>
        <SectionHeader
          onPress={onPressHeader}
          title={title}
          subtitle={subtitle}
        />
        <ScrollWrapper>
          {isLoading && <Loader isAbsolute />}
          <Scroll
            getItemLayout={this.getItemLayout}
            renderItem={this.renderPlaylist}
            keyExtractor={this.keyExtractor}
            data={playlist}
          />
        </ScrollWrapper>
      </SectionWrapper>
    )
  }
}

export default TracksSection
