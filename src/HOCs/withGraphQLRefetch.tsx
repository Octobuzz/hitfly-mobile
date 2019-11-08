import React, { useEffect } from 'react'

// для секций экрана Home
const withGraphQLRefetch = (WrappedComponent: React.ComponentType<any>) => {
  const GraphQLRefetch: React.FC<{
    refetch?: () => void
    getRefetcher?: (refetch: () => void) => void
  }> = ({ refetch, getRefetcher, ...rest }) => {
    useEffect(() => {
      if (refetch && getRefetcher) {
        getRefetcher(refetch)
      }
    }, [refetch, getRefetcher])

    return <WrappedComponent {...rest} />
  }

  return GraphQLRefetch
}

export default withGraphQLRefetch
