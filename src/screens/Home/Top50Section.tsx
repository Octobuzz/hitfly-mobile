import React from 'react'
import { Loader } from 'src/components'
import SectionHeader from './SectionHeader'
import { images } from 'src/constants'
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

// TODO: добавить тип
interface Playlist {
  some: any
}

interface Props {
  isLoading?: boolean
  playlist: Playlist
  onPress: (playlist: Playlist) => void
}

class Top50Section extends React.Component<Props> {
  render() {
    const { isLoading } = this.props
    return (
      <Wrapper>
        <SectionHeader title="Топ 50" subtitle="Рейтинг лучших музыкантов" />
        <Inner>
          <BackgroundImage />
          {isLoading && <Loader isFilled />}
        </Inner>
      </Wrapper>
    )
  }
}

export default Top50Section
