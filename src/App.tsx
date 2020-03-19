import React from 'react'
import './rn-debugger.config'
import { YellowBox } from 'react-native'
import { ThemeProvider } from 'styled-components'
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import AppNavigator from './navigation'
import { setupClient, storage } from './apollo'
import theme from './theme'
import firebase from 'react-native-firebase'
import NavigationService from './navigation/navigationService'
import { routes } from './constants'

// либы до сих пор используют это
YellowBox.ignoreWarnings([
  'Warning: componentWillMount',
  'Warning: componentWillUpdate',
  'Warning: componentWillReceiveProps',
  'cancelTouches',
  'UIManager',
  '`virtualizedCell.cellKey` of type `number`',
])

class App extends React.Component {
  client?: ApolloClient<InMemoryCache>
  unsubscribe?: any

  async componentDidMount() {
    this.client = await setupClient()
    this.forceUpdate()
    this.initFirebaseLinks()
  }

  private getIDFromUrl = (url: string) => {
    // @ts-ignore
    const id: string = url.split('#').pop()
    return parseInt(id, 10) || null
  }

  //TODO: пока нет детального вида лайфхака, но ID их ссылки все равно берем
  private async initFirebaseLinks() {
    const [token] = await Promise.all([storage.getToken()])
    firebase
      .links()
      .getInitialLink()
      .then(url => {
        if (url) {
          if (this.getIDFromUrl(url) && token) {
            NavigationService.navigate({ routeName: routes.TABS.LIFEHACKS })
          }
        }
      })
    this.unsubscribe = firebase.links().onLink(url => {
      if (this.getIDFromUrl(url) && token) {
        NavigationService.navigate({ routeName: routes.TABS.LIFEHACKS })
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    if (!this.client) {
      return null
    }
    return (
      <ApolloProvider client={this.client}>
        <ThemeProvider theme={theme}>
          <AppNavigator />
        </ThemeProvider>
      </ApolloProvider>
    )
  }
}

export default App
