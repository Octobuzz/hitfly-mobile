import L from 'lodash'
import React, { useCallback } from 'react'
import { graphql } from '@apollo/react-hoc'
import { MutationFunction } from '@apollo/react-common'
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

export interface SelectorsProps {
  selectCollection: (collectionId: number) => Promise<void>
  selectCollectionType: (type: string) => Promise<void>
  selectGenre: (genreId: number) => Promise<void>
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
      async (collectionId: number) => {
        await mutSelectCollection({ variables: { id: collectionId } })
      },
      [mutSelectCollection],
    )
    const selectGenre = useCallback(
      async (genreId: number) => {
        await mutSelectGenre({ variables: { id: genreId } })
      },
      [mutSelectGenre],
    )
    const selectCollectionType = useCallback(
      async (type: string) => {
        await mutSelectCollectionType({ variables: { type } })
      },
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
