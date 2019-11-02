import { useCallback } from 'react'
import { OperationVariables, QueryResult } from '@apollo/react-common'
import { QueryHookOptions } from '@apollo/react-hooks'
import { useQuery } from '@apollo/react-hooks'
import { DocumentNode } from 'graphql'
import { helpers } from 'src/utils'

interface Options<TData, TVariables>
  extends QueryHookOptions<TData, TVariables> {
  itemsSelector: (data?: TData) => any[]
  hasMorePagesSelector: (data?: TData) => boolean
  limit: number
}

interface Result<TData, TVariables> extends QueryResult<TData, TVariables> {
  onEndReached: () => void
  items: any
}

function useQueryWithPagination<TData = any, TVariables = OperationVariables>(
  query: DocumentNode,
  options: Options<TData, TVariables>,
): Result<TData, TVariables> {
  const {
    limit,
    itemsSelector,
    hasMorePagesSelector,
    ...originalOprions
  } = options
  const queryResult = useQuery<TData, TVariables>(query, originalOprions)

  const { data, loading, fetchMore } = queryResult

  const items = itemsSelector(data)
  const hasMorePages = hasMorePagesSelector(data)

  const onEndReached = useCallback(() => {
    if (hasMorePages && !loading) {
      // + 1, потому что для бэка 1 и 0 - одно и то же
      // поэтому page должна быть больше 1
      const page = Math.trunc(items.length / limit) + 1
      fetchMore({
        variables: { page, limit },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (fetchMoreResult) {
            // @ts-ignore
            return helpers.mergeRight(prev, fetchMoreResult)
          }
          return prev
        },
      })
    }
  }, [hasMorePages, items, limit, loading])

  return { ...queryResult, items, onEndReached }
}

export default useQueryWithPagination
