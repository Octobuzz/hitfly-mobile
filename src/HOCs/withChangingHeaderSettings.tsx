import React from 'react'
import { HeaderSettings } from 'src/apollo'
import { useChangingHeaderSettings } from 'src/hooks'

const withChangingHeaderSettings = (nextSettings: Partial<HeaderSettings>) => (
  WrappedComponent: React.ComponentType<any>,
) => {
  return (props: any): JSX.Element => {
    useChangingHeaderSettings(nextSettings)
    return <WrappedComponent {...props} />
  }
}

export default withChangingHeaderSettings
