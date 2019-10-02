import L from 'lodash'
import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import NonCollectionPlaylist from './NonCollectionPlaylist'
import { Album } from 'src/apollo'
import gql from 'graphql-tag'

// FIXME: тут чтото сделать с пагинацей:
// либо запросить все треки сразу
// либо добавить пагинацию в UI
const GET_ALBUM_TRACKS = gql`
  query getCurrentGenreTracks($albumId: Int!) {
    currentAlbumId @client @export(as: "albumId")
    playlist: tracks(limit: 1000, page: 0, filters: { albumId: $albumId }) {
      items: data {
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
        favouritesCount
      }
    }
  }
`

const GET_SELECTED_ALBUM = gql`
  query getSelectedGenre($albumId: Int!) {
    currentAlbumId @client @export(as: "albumId")
    album(id: $albumId) {
      id
      cover(sizes: [size_235x235]) {
        imageUrl: url
      }
    }
  }
`

interface SelectedAlbumData {
  album?: Album
}

const AlbumPlaylist: React.FC = props => {
  const { data } = useQuery<SelectedAlbumData>(GET_SELECTED_ALBUM)
  const imageUrl = L.get(data, 'album.cover[0].imageUrl')
  let cover
  if (imageUrl) {
    cover = { uri: imageUrl }
  }
  return (
    <NonCollectionPlaylist query={GET_ALBUM_TRACKS} cover={cover} {...props} />
  )
}
export default AlbumPlaylist
