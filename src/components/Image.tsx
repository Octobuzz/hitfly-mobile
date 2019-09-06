import React from 'react'
import FastImage, { FastImageProperties } from 'react-native-fast-image'
// @ts-ignore https://github.com/react-native-community/react-native-svg/issues/1089
import { SvgXml } from 'react-native-svg'

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
  console.tron.log(tmp)
  return tmp
}

const Image: React.FC<FastImageProperties> = ({
  source,
  style = { width: '100%', height: '100%' },
  ...rest
}) => {
  const [xml, setXml] = React.useState()
  React.useEffect(() => {
    if (
      typeof source !== 'number' &&
      source.uri &&
      source.uri.endsWith('.svg')
    ) {
      fetchText(source.uri)
        .then(removeStylesFromSvg)
        .then(setXml)
    }
  }, [source])

  return xml ? (
    <SvgXml style={style} xml={xml} />
  ) : (
    <FastImage source={source} style={style} {...rest} />
  )
}
export default Image
