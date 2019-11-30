import React from 'react'
import { Dimensions } from 'react-native'
// @ts-ignore
import HTMLComponent from 'react-native-render-html'
import { ScrollView } from 'src/components'

interface Props {
  url: string
}

const { width } = Dimensions.get('window')

const HTML: React.FC<Props> = ({ url }) => {
  return (
    <ScrollView>
      <HTMLComponent uri={url} imagesMaxWidth={width} />
    </ScrollView>
  )
}

export default HTML
