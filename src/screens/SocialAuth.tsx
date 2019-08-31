import React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import { WebView } from 'react-native-webview'

class SocialAuth extends React.Component<NavigationScreenProps> {
  render() {
    const { navigation } = this.props
    const url = navigation.getParam('url')
    return <WebView source={{ uri: url }} />
  }
}

export default SocialAuth
