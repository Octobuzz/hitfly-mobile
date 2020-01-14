import React, { useEffect } from 'react'
import { hideSplashScreenWithTimeout } from 'src/helpers'

const withHidingSplashScreen = (WrappedComponent: React.ComponentType<any>) => (
  props: any,
) => {
  useEffect(() => {
    hideSplashScreenWithTimeout()
  }, [])

  return <WrappedComponent {...props} />
}

export default withHidingSplashScreen
