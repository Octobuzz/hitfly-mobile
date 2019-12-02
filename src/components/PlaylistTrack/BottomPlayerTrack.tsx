import React from 'react'
import Icon from 'react-native-vector-icons/Foundation'
import { Image } from '../Image'
import { styles } from 'src/constants'
import { Track, ImageSizeNames } from 'src/apollo'
import styled from 'src/styled-components'
import { CenterBlock, TitleText, SubTitleText } from './styles'
import { useImageSource } from 'src/Hooks'

const Wrapper = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.8,
}))`
  padding: 16px ${styles.VIEW_HORIZONTAL_INDENTATION}px;
  flex-direction: row;
  align-items: center;
`

const TrackImage = styled(Image)`
  width: 24px;
  height: 24px;
  border-radius: 4px;
`

const PlayerButton = styled.TouchableOpacity`
  width: 34px;
  align-items: center;
`

const PlayerIcon = styled(Icon).attrs(({ theme }) => ({
  color: theme.colors.textMain,
  size: 36,
}))``

interface Props {
  track: Track
  isPlaying: boolean
  onPress: () => void
  onPressControl: () => void
}

const BottomPlayerTrack: React.FC<Props> = ({
  onPress,
  isPlaying,
  onPressControl,
  track: { cover, title, singer },
}) => {
  const source = useImageSource(cover, ImageSizeNames.S_32)

  return (
    <Wrapper onPress={onPress}>
      <TrackImage source={source} />
      <CenterBlock>
        <TitleText numberOfLines={2}>{title}</TitleText>
        <SubTitleText numberOfLines={2}>{singer}</SubTitleText>
      </CenterBlock>
      <PlayerButton onPress={onPressControl}>
        <PlayerIcon name={isPlaying ? 'pause' : 'play'} />
      </PlayerButton>
    </Wrapper>
  )
}

export default BottomPlayerTrack
