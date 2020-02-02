import LFP from 'lodash/fp'
import React from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import AlbumsDetailedContainer from './AlbumsDetailedContainer'
import { GET_MY_ALBUMS } from 'src/apollo'

interface Props extends NavigationStackScreenProps {}

const itemsSelector = LFP.getOr([], 'albums.items')
const hasMorePagesSelector = LFP.get('albums.hasMorePages')

const MyAlbumsDetailedContainer: React.FC<Props> = props => (
  <AlbumsDetailedContainer
    query={GET_MY_ALBUMS}
    itemsSelector={itemsSelector}
    hasMorePagesSelector={hasMorePagesSelector}
    {...props}
  />
)

export default MyAlbumsDetailedContainer
