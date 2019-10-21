import L from 'lodash'
import React from 'react'
import { ImageSourcePropType } from 'react-native'
import { Loader, TextBase } from 'src/components'
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

const BackgroundImage = styled.Image`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`

const BottomText = styled(props => <TextBase {...props} />)`
  color: ${({ theme }) => theme.colors.textWhite};
  font-size: 12px;
`

type BottomTextType = 'tracksCount' | 'tracksLength'

interface Props {
  title: string
  subtitle?: string
  playlist?: Playlist
  isLoading?: boolean
  tracksCount?: number
  bottomTextType?: BottomTextType
  imageSource: ImageSourcePropType
  onPress: () => void
}

const PlaylistSection: React.FC<Props> = ({
  title,
  onPress,
  playlist,
  subtitle,
  isLoading,
  tracksCount,
  imageSource,
  bottomTextType,
}) => {
  const bottomText = React.useMemo(() => {
    switch (bottomTextType) {
      case 'tracksCount': {
        const text = helpers.formatTracksCount(tracksCount || 0)
        return text
      }
      case 'tracksLength': {
        const fullLength: number = L.sumBy(playlist, 'length')
        const formattedTime = helpers.formatTimeDurationForPlaylist(fullLength)
        return formattedTime
      }
    }
  }, [playlist, bottomTextType, tracksCount])

  return (
    <SectionWrapper withPadding>
      <Inner onPress={onPress}>
        <BackgroundImage source={imageSource} />
        {isLoading ? (
          <Loader isAbsolute />
        ) : (
          <>
            <PlaylistHeader title={title} subtitle={subtitle} />
            {bottomText && <BottomText>{bottomText}</BottomText>}
          </>
        )}
      </Inner>
    </SectionWrapper>
  )
}

export default PlaylistSection
