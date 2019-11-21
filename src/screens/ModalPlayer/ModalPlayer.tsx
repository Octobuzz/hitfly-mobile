import React, { useCallback } from 'react'
import { Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/Foundation'
import { View, Image, Stretcher, TextBase } from 'src/components'
import { PlayerSlider } from 'src/containers'
import { styles } from 'src/constants'
import { ToggleTrackProps } from 'src/HOCs'
import styled from 'src/styled-components'

const { width } = Dimensions.get('window')

const COVER_HORIZONTAL_INDENT = (32 + styles.VIEW_HORIZONTAL_INDENTATION) * 2
const IMAGE_WIDTH = width - COVER_HORIZONTAL_INDENT
const IMAGE_HEIGHT = 275 // максимальная высота по макетам
const IMAGE_SIZE = Math.min(IMAGE_WIDTH, IMAGE_HEIGHT)

const CoverWrapper = styled.View`
  width: ${IMAGE_SIZE}px;
  height: ${IMAGE_SIZE}px;
  border-radius: 4px;
  align-self: center;
  overflow: hidden;
`

const CoverImage = styled(Image)`
  width: 100%;
  height: 100%;
`

const Cover: React.FC<{ source: any }> = ({ source }) => (
  <CoverWrapper>
    <CoverImage source={source} />
  </CoverWrapper>
)

const TitleText = styled(TextBase)`
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.white};
  font-size: 24px;
  line-height: 28px;
`
const SubTitleText = styled(TextBase)`
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  font-size: 16px;
`

const Wrapper = styled(View)`
  background-color: ${({ theme }) => theme.colors.black};
`

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`

const ControlWrapper = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.8,
}))`
  width: 30px;
  align-items: center;
`

const ControlIcon = styled(Icon).attrs(({ theme }) => ({
  color: theme.colors.white,
}))``

interface Props extends ToggleTrackProps {}

const ModalPlayer: React.FC<Props> = ({
  toggleTrack,
  activeTrack,
  nextTrack,
  prevTrack,
  isPlaying,
}) => {
  const {
    title,
    group,
    singer,
    cover: [{ imageUrl }],
  } = activeTrack!

  // приходит ивент в onPress, поэтому так сделано
  const handlePressPlay = useCallback(() => {
    toggleTrack()
  }, [toggleTrack])

  return (
    <>
      <Wrapper addTopNavigationHeaderPadding addTopSafePadding>
        <Cover source={{ uri: imageUrl }} />
        <Stretcher />
        <TitleText>{title}</TitleText>
        <SubTitleText>{group ? group.title : singer}</SubTitleText>
        <Stretcher gravity={3} />
        <Row>
          <ControlWrapper onPress={prevTrack}>
            <ControlIcon size={40} name="previous" />
          </ControlWrapper>
          <ControlWrapper onPress={handlePressPlay}>
            <ControlIcon size={50} name={isPlaying ? 'pause' : 'play'} />
          </ControlWrapper>
          <ControlWrapper onPress={nextTrack}>
            <ControlIcon size={40} name="next" />
          </ControlWrapper>
        </Row>
        <Stretcher gravity={3} />
      </Wrapper>
      <PlayerSlider />
      <Wrapper addBottomSafePadding noFill>
        <Row />
      </Wrapper>
    </>
  )
}

export default ModalPlayer
