import React, { useCallback } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const SELECT_COLLECTION = gql`
  mutation SelectCollection($id: Int!) {
    selectCollection(id: $id) @client
  }
`
const SELECT_GENRE = gql`
  mutation SelectGenre($id: Int!) {
    selectGenre(id: $id) @client
  }
`
const SELECT_COLLECTIONS_TYPE = gql`
  mutation SetCollectionsForDetails($type: String!) {
    setCollectionsForDetails(type: $type) @client
  }
`

const SELECT_ALBUM = gql`
  mutation SelectAlbum($id: Int!) {
    selectAlbum(id: $id) @client
  }
`

export interface SelectorsProps {
  selectCollection: (collectionId: number) => Promise<any>
  selectCollectionType: (type: string) => Promise<any>
  selectGenre: (genreId: number) => Promise<any>
  selectAlbum: (albumId: number) => Promise<any>
}

const withSelectors = <T extends SelectorsProps>(
  WrappedComponent: React.ComponentType<T>,
) => {
  const Selectors: React.FC<any> = props => {
    const [mutSelectGenre] = useMutation(SELECT_GENRE)
    const [mutSelectAlbum] = useMutation(SELECT_ALBUM)
    const [mutSelectCollection] = useMutation(SELECT_COLLECTION)
    const [mutSelectCollectionType] = useMutation(SELECT_COLLECTIONS_TYPE)

    const selectCollection = useCallback(
      (collectionId: number) =>
        mutSelectCollection({ variables: { id: collectionId } }),
      [mutSelectCollection],
    )
    const selectAlbum = useCallback(
      (albumId: number) => mutSelectAlbum({ variables: { id: albumId } }),
      [mutSelectAlbum],
    )
    const selectGenre = useCallback(
      (genreId: number) => mutSelectGenre({ variables: { id: genreId } }),
      [mutSelectGenre],
    )
    const selectCollectionType = useCallback(
      (type: string) => mutSelectCollectionType({ variables: { type } }),
      [mutSelectCollectionType],
    )

    return (
      <WrappedComponent
        selectAlbum={selectAlbum}
        selectCollection={selectCollection}
        selectCollectionType={selectCollectionType}
        selectGenre={selectGenre}
        {...props}
      />
    )
  }

  return Selectors
}

export default withSelectors
