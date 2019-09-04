import React from 'react'
import { Loader } from 'src/components'
import { images } from 'src/constants'
import { Playlist } from 'src/apollo'
import SectionHeader from './SectionHeader'
import styled from 'src/styled-components'

const Wrapper = styled.View``

const Inner = styled.TouchableOpacity`
  height: 160px;
  margin-horizontal: 16px;
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

interface Props {
  isLoading?: boolean
  playlist?: Playlist
  onPress: (playlist: Playlist) => void
}

const Top50Section: React.FC<Props> = ({ isLoading, onPress, playlist }) => {
  const handlePress = React.useCallback(() => {
    if (playlist) {
      onPress(playlist)
    }
  }, [onPress, playlist])

  return (
    <Wrapper>
      <SectionHeader
        onPress={handlePress}
        title="Топ 50"
        subtitle="Рейтинг лучших музыкантов"
      />
      <Inner onPress={handlePress}>
        <BackgroundImage />
        {isLoading && <Loader isFilled />}
      </Inner>
    </Wrapper>
  )
}

export default Top50Section
