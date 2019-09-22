import React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import { CollectionDetailsScreen } from 'src/screens'
import gql from 'graphql-tag'

const GET_COLLECTIONS = gql`
  query getCollectionsByType($type: String!) {
    collectionDetailsType @client @export(as: "type")
    collections: collectionsByType(type: $type) @client
  }
`

const CollectionDetails: React.FC<NavigationScreenProps> = props => (
  <CollectionDetailsScreen query={GET_COLLECTIONS} {...props} />
)

export default CollectionDetails
