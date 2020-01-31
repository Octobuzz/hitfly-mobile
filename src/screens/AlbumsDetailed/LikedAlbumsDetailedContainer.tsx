import LFP from 'lodash/fp'
import React from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import AlbumsDetailedContainer from './AlbumsDetailedContainer'
import { GET_LIKED_ALBUMS } from 'src/apollo'

interface Props extends NavigationStackScreenProps {}

const itemsSelector = LFP.getOr([], 'albums.items')
const hasMorePagesSelector = LFP.get('albums.hasMorePages')
const transformer = LFP.get('album')

const LikedAlbumsDetailedContainer: React.FC<Props> = props => (
  <AlbumsDetailedContainer
    transformer={transformer}
    query={GET_LIKED_ALBUMS}
    itemsSelector={itemsSelector}
    hasMorePagesSelector={hasMorePagesSelector}
    {...props}
  />
)

export default LikedAlbumsDetailedContainer
