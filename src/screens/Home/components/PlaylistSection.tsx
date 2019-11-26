import React from 'react'
import { ImageSourcePropType } from 'react-native'
import { Loader, TextBase } from 'src/components'
import { Playlist } from 'src/apollo'
import SectionWrapper from './SectionWrapper'
import PlaylistHeader from './PlaylistHeader'
import { formatTracksCount } from 'src/helpers'
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

const BottomText = styled(TextBase)`
  color: ${({ theme }) => theme.colors.textWhite};
  font-size: 12px;
`

interface Props {
  title: string
  subtitle?: string
  playlist?: Playlist
  isLoading?: boolean
  tracksCount: number
  imageSource: ImageSourcePropType
  onPress: () => void
}

const PlaylistSection: React.FC<Props> = ({
  title,
  onPress,
  subtitle,
  isLoading,
  imageSource,
  tracksCount,
  playlist = [],
}) => {
  if (!isLoading && tracksCount === 0) {
    return null
  }
  const bottomText = React.useMemo(() => formatTracksCount(tracksCount), [
    playlist,
    tracksCount,
  ])

  return (
    <SectionWrapper withPadding>
      <Inner onPress={onPress}>
        <BackgroundImage source={imageSource} />
        {isLoading ? (
          <Loader isAbsolute />
        ) : (
          <>
            <PlaylistHeader title={title} subtitle={subtitle} />
            <BottomText>{bottomText}</BottomText>
          </>
        )}
      </Inner>
    </SectionWrapper>
  )
}

export default PlaylistSection
