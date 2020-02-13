import React from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import LifehackItem from './LifehackItem'
import { View } from 'src/components'
import { Lifehack } from 'src/apollo'

interface Props extends NavigationStackScreenProps<{ lifehack: Lifehack }> {}

// FIXME: временно
const LifehackDetailed: React.FC<Props> = ({ navigation }) => {
  const lifehack = navigation.getParam('lifehack')
  return (
    <View>
      <LifehackItem lifehack={lifehack} />
    </View>
  )
}

export default LifehackDetailed
