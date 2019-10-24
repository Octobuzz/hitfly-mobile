import React from 'react'

// для секций экрана Home
const withGraphQLRefetch = (WrappedComponent: React.ComponentType<any>) =>
  class GraphQLRefetch extends React.Component<{ refetch?: () => void }> {
    refreshData = (): void => {
      const { refetch } = this.props
      if (refetch) {
        refetch()
      }
    }

    render() {
      const { refetch, ...rest } = this.props
      return <WrappedComponent {...rest} />
    }
  }

export default withGraphQLRefetch
