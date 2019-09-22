import L from 'lodash'
import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { PlaylistScreen } from 'src/screens'
import { Collection } from 'src/apollo'
import { Loader } from 'src/components'

const GET_CURRENT_COLLECTION = gql`
  query getCurrentCollection($collectionId: Int!) {
    currentCollectionId @client @export(as: "collectionId")
    collection(id: $collectionId) {
      id
      images: image(sizes: [size_290x290]) {
        imageUrl: url
      }
      title
      favouritesCount
      tracks {
        id
        title: trackName
        group: musicGroup {
          title: name
        }
        singer
        fileUrl: filename
        cover(sizes: [size_290x290]) {
          imageUrl: url
        }
        length
      }
    }
  }
`

interface Data {
  collection?: Collection
}

const CollectionPlaylist: React.FC = props => {
  const { data, loading } = useQuery<Data>(GET_CURRENT_COLLECTION)
  if (loading) {
    return <Loader isAbsolute />
  }

  const collection = L.get(data, 'collection')
  if (!collection) {
    return null
  }

  const { images, favouritesCount, tracks } = collection
  return (
    <PlaylistScreen
      cover={{ uri: images[0].imageUrl }}
      tracks={tracks}
      favouritesCount={favouritesCount || 0}
      {...props}
    />
  )
}

export default CollectionPlaylist
