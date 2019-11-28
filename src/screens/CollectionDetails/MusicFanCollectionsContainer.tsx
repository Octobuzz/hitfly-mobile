import React from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import CollectionDetailsContainer from './CollectionDetailsContainer'
import { GET_MUSIC_FAN } from 'src/apollo'

interface Props extends NavigationStackScreenProps {}

const RecommenedCollectionsContainer: React.FC<Props> = props => (
  <CollectionDetailsContainer query={GET_MUSIC_FAN} {...props} />
)

export default RecommenedCollectionsContainer
