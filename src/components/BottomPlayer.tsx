import React from 'react'
import { styles } from 'src/constants'
import { Image } from './Image'
import { More } from './buttons'
import TextBase from './TextBase'
import Icon from 'react-native-vector-icons/Foundation'
import Slider from './Slider'
import styled from 'src/styled-components'
import { Track } from 'src/apollo'

const Wrapper = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
`

const Inner = styled.View`
  padding: 16px ${styles.VIEW_HORIZONTAL_INDENTATION}px;
  flex-direction: row;
  align-items: center;
`

const TrackImage = styled(Image)`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  margin-right: 4px;
`

const CenterBlock = styled.View`
  flex: 1;
`

const TitleText = styled(TextBase).attrs(() => ({
  numberOfLines: 1,
}))`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 12px;
  line-height: 18px;
`

const SubTitleText = styled(TextBase).attrs(() => ({
  numberOfLines: 1,
}))`
  font-size: 8px;
  line-height: 8px;
  color: ${({ theme }) => theme.colors.textAlt};
`

const PlayerButton = styled.TouchableOpacity`
  padding-horizontal: 24px;
`

const PlayerIcon = styled(Icon).attrs(({ theme }) => ({
  color: theme.colors.textMain,
  size: 36,
}))``

const AbsoluteSlider = styled(Slider)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`

interface Props {
  track?: Track
  progress?: number
  duration?: number
  isPlaying: boolean
  onPressMore: () => void
  onPressControl: () => void
}

const BottomPlayer: React.FC<Props> = ({
  track,
  progress,
  duration,
  isPlaying,
  onPressMore,
  onPressControl,
}) => {
  if (!track) {
    return null
  }
  const { title, group, singer, cover } = track
  return (
    <Wrapper>
      {!!progress && !!duration && (
        <AbsoluteSlider maximumValue={duration} value={progress} step={1} />
      )}
      <Inner>
        <TrackImage source={{ uri: cover[0].imageUrl }} />
        <CenterBlock>
          <TitleText>{title}</TitleText>
          <SubTitleText>{group ? group.title : singer}</SubTitleText>
        </CenterBlock>
        <More onPress={onPressMore} />
        <PlayerButton onPress={onPressControl}>
          <PlayerIcon name={isPlaying ? 'pause' : 'play'} />
        </PlayerButton>
      </Inner>
    </Wrapper>
  )
}

export default BottomPlayer
