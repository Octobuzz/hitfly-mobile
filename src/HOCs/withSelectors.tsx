import L from 'lodash'
import React, { useCallback } from 'react'
import { graphql } from '@apollo/react-hoc'
import { MutationFunction } from '@apollo/react-common'
import gql from 'graphql-tag'

// FIXME: стоит сделать через навигацию а не через селекты и стор?
// TODO: сделать через хук

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

export interface SelectorsProps {
  selectCollection: (collectionId: number) => Promise<any>
  selectCollectionType: (type: string) => Promise<any>
  selectGenre: (genreId: number) => Promise<any>
}

interface Props {
  mutSelectGenre: MutationFunction<any, { id: number }>
  mutSelectCollection: MutationFunction<any, { id: number }>
  mutSelectCollectionType: MutationFunction<any, { type: string }>
}

const withSelectors = (
  WrappedComponent: React.ComponentType<SelectorsProps>,
) => {
  const Selectors: React.FC<Props> = ({
    mutSelectGenre,
    mutSelectCollection,
    mutSelectCollectionType,
    ...rest
  }) => {
    const selectCollection = useCallback(
      (collectionId: number) =>
        mutSelectCollection({ variables: { id: collectionId } }),
      [mutSelectCollection],
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
        selectCollection={selectCollection}
        selectCollectionType={selectCollectionType}
        selectGenre={selectGenre}
        {...rest}
      />
    )
  }

  return L.flowRight(
    graphql(SELECT_COLLECTION, { name: 'mutSelectCollection' }),
    graphql(SELECT_GENRE, { name: 'mutSelectGenre' }),
    graphql(SELECT_COLLECTIONS_TYPE, { name: 'mutSelectCollectionType' }),
    // @ts-ignore
  )(Selectors)
}

export default withSelectors