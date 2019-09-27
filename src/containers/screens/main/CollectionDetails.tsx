import React from 'react'
import { CollectionDetailsScreen } from 'src/screens'
import { withChangingHeaderSettings } from 'src/containers/HOCs'
import gql from 'graphql-tag'

const GET_COLLECTIONS = gql`
  query getCollectionsByType($type: String!) {
    collectionDetailsType @client @export(as: "type")
    collections: collectionsByType(type: $type) @client
  }
`

const CollectionDetails: React.FC<any> = props => (
  <CollectionDetailsScreen query={GET_COLLECTIONS} {...props} />
)

export default withChangingHeaderSettings({ state: 'main', mode: 'dark' })(
  CollectionDetails,
)
