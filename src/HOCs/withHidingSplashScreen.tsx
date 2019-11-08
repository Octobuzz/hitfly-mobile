import React, { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'

const withHidingSplashScreen = (WrappedComponent: React.ComponentType<any>) => (
  props: any,
) => {
  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return <WrappedComponent {...props} />
}

export default withHidingSplashScreen
