import React from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import CollectionDetailsContainer from './CollectionDetailsContainer'
import { GET_RECOMMENDED } from 'src/apollo'

interface Props extends NavigationStackScreenProps {}

const RecommenedCollectionsContainer: React.FC<Props> = props => (
  <CollectionDetailsContainer query={GET_RECOMMENDED} {...props} />
)

export default RecommenedCollectionsContainer
