import React from 'react'
import { styles } from 'src/constants'
import { Image } from './Image'
import { More } from './buttons'
import TextBase from './TextBase'
import styled from 'src/styled-components'
import { Track } from 'src/apollo'

const Wrapper = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
`

const Inner = styled.View`
  padding: 24px ${styles.VIEW_HORIZONTAL_INDENTATION}px 16px;
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
  flex: 1;
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 12px;
`

const SubTitleText = styled(TextBase).attrs(() => ({
  numberOfLines: 1,
}))`
  flex: 1;
  font-size: 8px;
  color: ${({ theme }) => theme.colors.textAlt};
`

const Slider = styled.Slider`
  flex: 1;
`

interface Props {
  track?: Track
  progress?: number
  duration?: number
  onPressMore: () => void
  toggleTrack: (track?: Track) => void
}

const BottomPlayer: React.FC<Props> = ({
  track,
  onPressMore,
  progress,
  duration,
}) => {
  if (!track) {
    return null
  }
  const { title, group, singer, cover } = track
  return (
    <Wrapper>
      {!!progress && !!duration && (
        <Slider
          minimumValue={0}
          maximumValue={duration}
          value={progress}
          pointerEvents="none"
          step={1}
        />
      )}
      <Inner>
        <TrackImage source={{ uri: cover[0].imageUrl }} />
        <CenterBlock>
          <TitleText>{title}</TitleText>
          <SubTitleText>{group ? group.title : singer}</SubTitleText>
        </CenterBlock>
        <More onPress={onPressMore} />
      </Inner>
    </Wrapper>
  )
}

export default BottomPlayer
