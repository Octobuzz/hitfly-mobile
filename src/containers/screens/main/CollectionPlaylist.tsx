import L from 'lodash'
import React from 'react'
import gql from 'graphql-tag'
import { DataProps, graphql } from '@apollo/react-hoc'
import { withChangingHeaderSettings } from 'src/containers/HOCs'
import { PlaylistScreen } from 'src/screens'
import { Collection } from 'src/apollo'
import { Loader } from 'src/components'

interface Props extends DataProps<{ collection?: Collection }> {}

const CollectionPlaylist: React.FC<Props> = ({
  data: { loading, collection },
  ...rest
}) => {
  if (loading) {
    return <Loader isAbsolute />
  }

  if (!collection) {
    return null
  }

  const { images, favouritesCount, tracks } = collection
  return (
    <PlaylistScreen
      cover={{ uri: images[0].imageUrl }}
      tracks={tracks}
      favouritesCount={favouritesCount || 0}
      {...rest}
    />
  )
}

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

export default L.flowRight(
  withChangingHeaderSettings({ state: 'main', mode: 'light' }),
  graphql<Props>(GET_CURRENT_COLLECTION),
)(CollectionPlaylist)
