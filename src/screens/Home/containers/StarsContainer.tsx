import L from 'lodash'
import React, { useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { StarsSection } from '../components'
import { GET_STARS, UsersData } from 'src/apollo'

const StarsContainer: React.FC<any> = ({ getRefetcher }) => {
  const { data, loading, refetch } = useQuery<UsersData>(GET_STARS, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  })

  useEffect(() => {
    if (getRefetcher) {
      getRefetcher(refetch)
    }
  }, [getRefetcher])

  const users = L.get(data, 'users.items', [])

  return <StarsSection users={users} isLoading={loading} />
}

export default StarsContainer
