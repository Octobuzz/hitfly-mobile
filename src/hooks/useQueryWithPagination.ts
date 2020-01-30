import { useCallback } from 'react'
import { QueryResult } from '@apollo/react-common'
import { useQuery, QueryHookOptions } from '@apollo/react-hooks'
import { DocumentNode } from 'graphql'
import { mergeRight } from 'src/helpers'

interface Options<TData> extends QueryHookOptions<TData> {
  itemsSelector: (data?: TData) => any[]
  hasMorePagesSelector: (data?: TData) => boolean
  limit: number
}

interface PaginationVariables {
  limit?: number
  page?: number
  [key: string]: any
}

interface Result<TData, TVariables> extends QueryResult<TData, TVariables> {
  onEndReached: () => void
  items: any[]
}

function useQueryWithPagination<TData = any>(
  query: DocumentNode,
  options: Options<TData>,
): Result<TData, PaginationVariables> {
  const {
    limit,
    variables,
    itemsSelector,
    hasMorePagesSelector,
    ...originalOptions
  } = options
  const queryResult = useQuery<TData, PaginationVariables>(query, {
    ...originalOptions,
    variables: { ...variables, limit },
  })

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
            return mergeRight(prev, fetchMoreResult)
          }
          return prev
        },
      })
    }
  }, [hasMorePages, items, limit, loading])

  return { ...queryResult, items, onEndReached, data }
}

export default useQueryWithPagination
