import L from 'lodash'
import React from 'react'
import { FlatList } from 'react-native'
import { Loader, TextBase } from 'src/components'
import { images } from 'src/constants'
import { Playlist, Collection } from 'src/apollo'
import { SectionHeader, SectionWrapper } from './components'
import { helpers } from 'src/utils'
import styled from 'src/styled-components'

const ITEM_WIDTH = 214
const ITEM_HEIGHT = 160
const DIVIDER_SIZE = 8

const ItemWrapper = styled.TouchableOpacity`
  height: ${ITEM_HEIGHT}px;
  width: ${ITEM_WIDTH}px;
  padding: 16px;
  justify-content: space-between;
`

const BackgroundImage = styled.Image.attrs(() => ({
  source: images.TOP50_BACKGROUND,
}))`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`

const BottomText = styled(TextBase)`
  color: ${({ theme }) => theme.colors.textWhite};
  font-size: 12px;
`

const getNameForTrack = helpers.getNameForCount({
  nominative: 'песня',
  genitive: 'песни',
  genitiveMultiple: 'песен',
})

interface RecommendedItemProps {
  collection: Collection
  onPress: (collection: Collection) => void
}

const RecommendedItem: React.FC<RecommendedItemProps> = ({
  collection,
  onPress,
}) => {
  const bottomText = getNameForTrack(collection.tracksCountInPlaylist)

  const handlePress = React.useCallback(() => {
    if (collection) {
      onPress(collection)
    }
  }, [onPress, collection])

  return (
    <ItemWrapper onPress={handlePress}>
      <BackgroundImage />
      <BottomText>{bottomText}</BottomText>
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

const Scroll = styled(FlatList as new () => FlatList<Collection>).attrs(() => ({
  horizontal: true,
  initialNumToRender: 2,
  contentInset: { left: 12, right: 12 },
  contentOffset: { x: -12, y: 0 },
  showsHorizontalScrollIndicator: false,
}))``

interface Props {
  isLoading?: boolean
  collections: Collection[]
  onPressCollection: (collection: Collection) => void
  onPressHeader: () => void
}

class RecommendedSection extends React.Component<Props> {
  private keyExtractor = (item: Collection): string => item.id.toString()

  private renderCollection = ({ item }: { item: Collection }): JSX.Element => {
    const { onPressCollection } = this.props
    return (
      <Column>
        <RecommendedItem onPress={onPressCollection} collection={item} />
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
    const { isLoading, collections, onPressHeader } = this.props
    return (
      <SectionWrapper>
        <SectionHeader
          onPress={onPressHeader}
          title="Рекомендованное"
          subtitle="Плейлисты, собранные специально для тебя"
        />
        <ScrollWrapper>
          {isLoading && <Loader isAbsolute />}
          <Scroll
            getItemLayout={this.getItemLayout}
            renderItem={this.renderCollection}
            keyExtractor={this.keyExtractor}
            data={collections}
          />
        </ScrollWrapper>
      </SectionWrapper>
    )
  }
}

export default RecommendedSection
