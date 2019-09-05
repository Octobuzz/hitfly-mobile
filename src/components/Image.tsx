import React from 'react'
import FastImage, { FastImageProperties } from 'react-native-fast-image'
// @ts-ignore https://github.com/react-native-community/react-native-svg/issues/1089
import { SvgUri } from 'react-native-svg'

const Image: React.FC<FastImageProperties> = ({ source, ...rest }) => {
  const isSvg =
    typeof source !== 'number' && source.uri && source.uri.endsWith('.svg')

  return isSvg ? (
    // @ts-ignore
    <SvgUri width="100%" height="100%" uri={source.uri} {...rest} />
  ) : (
    <FastImage source={source} {...rest} />
  )
}
export default Image
