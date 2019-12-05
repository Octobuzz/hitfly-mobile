import React, { useCallback } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const SELECT_GENRE = gql`
  mutation SelectGenre($id: Int!) {
    selectGenre(id: $id) @client
  }
`

export interface SelectorsProps {
  selectGenre: (genreId: number) => Promise<any>
}

const withSelectors = <T extends SelectorsProps>(
  WrappedComponent: React.ComponentType<T>,
) => {
  const Selectors: React.FC<any> = props => {
    const [mutSelectGenre] = useMutation(SELECT_GENRE)

    const selectGenre = useCallback(
      (genreId: number) => mutSelectGenre({ variables: { id: genreId } }),
      [],
    )

    return <WrappedComponent selectGenre={selectGenre} {...props} />
  }

  return Selectors
}

export default withSelectors
