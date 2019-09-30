import React, { useMemo } from 'react'
import gql from 'graphql-tag'
import { DataValue, graphql } from '@apollo/react-hoc'
import LikedMusicScreen from './LikedMusic'
import { FavouriteTrack, Pagination } from 'src/apollo'
import { Loader } from 'src/components'

interface Props {
  tracksData: DataValue<{ pagination: Pagination<FavouriteTrack> }>
  albumsData: DataValue<{ pagination: Pagination<FavouriteTrack> }>
}

const LikedMusicContainer: React.FC<Props> = ({
  tracksData: { pagination, loading },
  ...rest
}) => {
  if (loading) {
    return <Loader isAbsolute />
  }
  if (!pagination || !pagination.items) {
    return null
  }

  const normalTracks = useMemo(
    () => pagination.items.map(({ track }) => track),
    [pagination],
  )

  return <LikedMusicScreen albums={[]} tracks={normalTracks} {...rest} />
}

// FIXME: потом заделать пагинацию нормально
// FIXME: сделать через фрагменты
const GET_LIKED_MUSIC = gql`
  query {
    pagination: favouriteTrack(limit: 1000, page: 1) {
      items: data {
        id
        track {
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
  }
`

// @ts-ignore
export default graphql<Props>(GET_LIKED_MUSIC, { name: 'tracksData' })(
  LikedMusicContainer,
)
