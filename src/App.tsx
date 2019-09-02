import React from 'react'
import './reactotron.config'
import { YellowBox } from 'react-native'
import { ThemeProvider } from 'styled-components'
import ApolloClient, { InMemoryCache } from 'apollo-boost'
import { persistCache } from 'apollo-cache-persist'
import { ApolloProvider } from '@apollo/react-hooks'
import AppNavigator from './navigation'
import { storageInstance, storage } from './utils'
import theme from './theme'
import { names, storageKeys } from './constants'

// либы до сих пор используют это
YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillUpdate is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
])

async function createApolloClient(): Promise<ApolloClient<InMemoryCache>> {
  const cache = new InMemoryCache({})

  await persistCache({
    cache,
    // @ts-ignore
    storage: storageInstance,
  })

  const token = await storage.getItem(storageKeys.AUTH_TOKEN)

  const client = new ApolloClient<InMemoryCache>({
    cache,
    headers: {
      'X-TOKEN-AUTH': token,
    },
    uri: names.BASE_URL,
  })

  return client
}

class App extends React.Component<{}, { isReady: boolean }> {
  client?: ApolloClient<InMemoryCache>
  state = {
    isReady: false,
  }

  async componentDidMount() {
    this.client = await createApolloClient()
    this.setState({ isReady: true })
  }

  render() {
    const { isReady } = this.state
    return (
      isReady &&
      this.client && (
        <ApolloProvider client={this.client}>
          <ThemeProvider theme={theme}>
            <AppNavigator />
          </ThemeProvider>
        </ApolloProvider>
      )
    )
  }
}

export default App
