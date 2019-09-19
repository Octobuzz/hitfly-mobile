import React from 'react'
import FastImage, {
  FastImageSource,
  FastImageProperties,
} from 'react-native-fast-image'
import { SvgXml } from 'react-native-svg'

interface SvgImageProps {
  uri: string
  style: any
}

export const SvgImage: React.FC<SvgImageProps> = ({ uri, style }) => {
  const [xml, setXml] = React.useState<string | null>(null)
  React.useEffect(() => {
    fetchText(uri)
      .then(removeStylesFromSvg)
      .then(setXml)
  }, [uri])
  return <SvgXml style={style} xml={xml} />
}

// В картинках есть теги <style> - их надо удалить ибо ошибка
const fetchText = async (uri: string): Promise<string> => {
  try {
    const response = await fetch(uri)
    return await response.text()
  } catch {
    return ''
  }
}

const removeStylesFromSvg = (svg: string): string => {
  const tmp = svg.replace(/<style>.*<\/style>/gi, '')
  return tmp
}

export interface ImageProps extends FastImageProperties {}

export const Image: React.FC<ImageProps> = ({ style, source, ...rest }) => {
  const svgUri = getSvgUri(source)
  return svgUri ? (
    <SvgImage style={style} uri={svgUri} />
  ) : (
    <FastImage source={source} style={style} {...rest} />
  )
}

const getSvgUri = (source: FastImageSource | number): string | undefined => {
  if (typeof source !== 'number' && source.uri && source.uri.endsWith('.svg')) {
    return source.uri
  }
}
