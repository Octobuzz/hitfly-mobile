import React, { useMemo } from 'react'
import { Image as RNImage } from 'react-native'
import FastImage, {
  FastImageSource,
  FastImageProperties,
} from 'react-native-fast-image'
import { images } from 'src/constants'
import styled from 'src/styled-components'

interface SvgImageProps {
  uri: string
  style?: any
}

export const SvgImage: React.FC<SvgImageProps> = ({ uri, style }) => {
  const [source, setSource] = React.useState<number>(images.DEFAULT_TRACK)
  React.useEffect(() => {
    const imageName = uri
      .split('/')
      .pop()!
      .toLowerCase()
      .split('.svg')![0]
    switch (imageName) {
      default:
      case 'default_track': {
        setSource(images.DEFAULT_TRACK)
        break
      }
      case 'default_profile': {
        setSource(images.DEFAULT_PROFILE)
        break
      }
      case 'default_album': {
        setSource(images.DEFAULT_ALBUM)
        break
      }
      case 'default_musicgroup':
      case 'default_playlist': {
        setSource(images.DEFAULT_GROUP)
        break
      }
    }
  }, [uri])
  return <RNImage style={style} source={source} />
}

export type SourceType = FastImageSource

interface ImageProps extends FastImageProperties {}

export const Image: React.FC<ImageProps> = ({ style, source, ...rest }) => {
  const svgUri = getSvgUri(source)
  return svgUri ? (
    <SvgImage style={style} uri={svgUri} />
  ) : (
    <FastImage source={source} style={style} {...rest} />
  )
}

const getSvgUri = (source: FastImageSource | number): string | undefined => {
  if (
    source &&
    typeof source !== 'number' &&
    source.uri &&
    source.uri.endsWith('.svg')
  ) {
    return source.uri
  }
}

const Wrapper = styled.View``

const Overlay = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.transparent10};
`

export const DarkenImage: React.FC<ImageProps> = ({ style, ...rest }) => {
  const imageStyle = useMemo(() => ({ width: '100%', height: '100%' }), [])
  return (
    <Wrapper style={style}>
      <Image style={imageStyle} {...rest} />
      <Overlay />
    </Wrapper>
  )
}
