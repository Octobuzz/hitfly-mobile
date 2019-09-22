import React from 'react'
import gql from 'graphql-tag'
import { Query } from '@apollo/react-components'
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

class Playlist extends React.Component {
  render() {
    return (
      <Query<Data> query={GET_CURRENT_COLLECTION}>
        {({ data, loading }) => {
          if (loading) {
            return <Loader isAbsolute />
          }

          if (!data || !data.collection) {
            return null
          }
          const { images, favouritesCount, tracks } = data.collection

          return (
            <PlaylistScreen
              cover={{ uri: images[0].imageUrl }}
              tracks={tracks}
              favouritesCount={favouritesCount || 0}
              {...this.props}
            />
          )
        }}
      </Query>
    )
  }
}

export default Playlist
