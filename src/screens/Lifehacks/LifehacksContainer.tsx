import L from 'lodash'
import React from 'react'
import LifehacksScreen from './Lifehacks'
import { GET_LIFEHACKS, LifehacksData } from 'src/apollo'
import { useQueryWithPagination } from 'src/hooks'
import { names } from 'src/constants'

const hasMorePagesSelector = (data?: LifehacksData) =>
  L.get(data, 'lifehacks.hasMorePages')
const itemsSelector = (data?: LifehacksData) =>
  L.get(data, 'lifehacks.items', [])

interface Props {}

const LifehacksContainer: React.FC<Props> = () => {
  const {
    items,
    refetch,
    onEndReached,
    networkStatus,
  } = useQueryWithPagination<LifehacksData>(GET_LIFEHACKS, {
    itemsSelector,
    hasMorePagesSelector,
    limit: names.LIFEHACKS_LIMIT,
    fetchPolicy: 'cache-and-network',
  })

  return (
    <LifehacksScreen
      lifehacks={items}
      onRefresh={refetch}
      onEndReached={onEndReached}
      isFetchingMore={networkStatus === 3}
      isLoading={networkStatus === 1}
      isRefreshing={networkStatus === 4}
    />
  )
}

export default LifehacksContainer
