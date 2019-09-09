import React from 'react'
import { FlatList } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Loader, TextBase } from 'src/components'
import { Collection } from 'src/apollo'
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
  align-items: flex-end;
  justify-content: space-between;
  border-radius: 4px;
  overflow: hidden;
`

const BackgroundImage = styled(FastImage).attrs(() => ({
  resizeMode: 'cover',
}))`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`

const TopText = styled(TextBase)`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.textWhite};
  font-size: 12px;
`

const BottomText = styled(TextBase)`
  color: ${({ theme }) => theme.colors.textWhite};
  font-size: 12px;
`

interface CollectionItemProps {
  collection: Collection
  onPress: (collection: Collection) => void
}

const CollectionItem: React.FC<CollectionItemProps> = ({
  collection,
  onPress,
}) => {
  const handlePress = React.useCallback(() => {
    if (collection) {
      onPress(collection)
    }
  }, [onPress, collection])

  const { tracksCountInPlaylist, title, images } = collection
  const bottomText = helpers.formatTracksCount(tracksCountInPlaylist)
  return (
    <ItemWrapper onPress={handlePress}>
      <BackgroundImage source={{ uri: images[0].imageUrl }} />
      <TopText>{title}</TopText>
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
  showsHorizontalScrollIndicator: false,
}))`
  padding-horizontal: 12px;
`

interface Props {
  title: string
  subtitle?: string
  isLoading?: boolean
  collections: Collection[]
  onPressCollection: (collection: Collection) => void
  onPressHeader: () => void
}

class ColleactionSection extends React.Component<Props> {
  private keyExtractor = (item: Collection): string => item.id.toString()

  private renderCollection = ({ item }: { item: Collection }): JSX.Element => {
    const { onPressCollection } = this.props
    return (
      <Column>
        <CollectionItem onPress={onPressCollection} collection={item} />
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
    const {
      title,
      subtitle,
      isLoading,
      collections,
      onPressHeader,
    } = this.props
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
            renderItem={this.renderCollection}
            keyExtractor={this.keyExtractor}
            data={collections}
          />
        </ScrollWrapper>
      </SectionWrapper>
    )
  }
}

export default ColleactionSection
