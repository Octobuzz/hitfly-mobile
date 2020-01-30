import React from 'react'
import { Dimensions } from 'react-native'
import HTMLComponent from 'react-native-render-html'
import { ScrollView } from 'src/components'
import theme from 'src/theme'

interface Props {
  url: string
}

const { width } = Dimensions.get('window')

const tagStyles = {
  b: {
    fontFamily: theme.fonts.bold,
  },
  h1: {
    fontFamily: theme.fonts.bold,
  },
  h2: {
    fontFamily: theme.fonts.bold,
  },
}

const baseFontStyle = {
  fontSize: 14,
  fontFamily: theme.fonts.regular,
}

const HTML: React.FC<Props> = ({ url }) => (
  <ScrollView>
    <HTMLComponent
      baseFontStyle={baseFontStyle}
      tagStyles={tagStyles}
      uri={url}
      imagesMaxWidth={width}
    />
  </ScrollView>
)

export default HTML
