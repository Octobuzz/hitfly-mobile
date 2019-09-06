import L from 'lodash'
import React from 'react'
import { Loader, TextBase } from 'src/components'
import { images } from 'src/constants'
import { Playlist } from 'src/apollo'
import { PlaylistHeader, SectionWrapper } from './components'
import { helpers } from 'src/utils'
import styled from 'src/styled-components'

const Inner = styled.TouchableOpacity`
  height: 160px;
  padding: 16px;
  justify-content: space-between;
  overflow: hidden;
  border-radius: 4px;
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

interface Props {
  isLoading?: boolean
  playlist: Playlist
  onPress: (playlist: Playlist) => void
}

const Top50Section: React.FC<Props> = ({ isLoading, onPress, playlist }) => {
  const handlePress = React.useCallback(() => {
    if (playlist) {
      onPress(playlist)
    }
  }, [onPress, playlist])

  const bottomText = React.useMemo(() => {
    const fullLength: number = L.sumBy(playlist, 'length')
    const formattedTime = helpers.formatTimeDurationForPlaylist(fullLength)
    return formattedTime
  }, [playlist])

  return (
    <SectionWrapper withPadding>
      <Inner onPress={handlePress}>
        <BackgroundImage />
        {isLoading ? (
          <Loader isAbsolute />
        ) : (
          <>
            <PlaylistHeader
              title="Топ 50"
              subtitle="Рейтинг лучших музыкантов"
            />
            <BottomText>{bottomText}</BottomText>
          </>
        )}
      </Inner>
    </SectionWrapper>
  )
}

export default Top50Section
