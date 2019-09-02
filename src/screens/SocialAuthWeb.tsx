import React from 'react'
import { NavigationScreenProps } from 'react-navigation'
import { WebView } from 'react-native-webview'
import { WebViewNativeEvent } from 'react-native-webview/lib/WebViewTypes'
import { SafeView, Loader } from 'src/components'
import { storageKeys } from 'src/constants'
import { delay } from 'src/utils/helpers'
import { storage } from 'src/utils'
import { ROUTES } from 'src/navigation'
import urlParser from 'url'

class SocialAuthWeb extends React.Component<NavigationScreenProps> {
  private renderLoader = (): JSX.Element => <Loader isAbsolute />

  private handleNavigationStateChange = async ({
    url,
  }: WebViewNativeEvent): Promise<void> => {
    const { navigation } = this.props
    const { query } = urlParser.parse(url, true)

    if (query && query.token) {
      // успешно вошел если есть токен в query
      await storage.setItem(storageKeys.AUTH_TOKEN, query.token as string)
      await delay(1000)
      navigation.navigate(ROUTES.MAIN.HOME)
    }
  }

  render() {
    const { navigation } = this.props
    const url = navigation.getParam('url')
    return (
      <SafeView>
        <WebView
          incognito
          startInLoadingState
          onNavigationStateChange={this.handleNavigationStateChange}
          renderLoading={this.renderLoader}
          source={{ uri: url }}
        />
      </SafeView>
    )
  }
}

export default SocialAuthWeb
