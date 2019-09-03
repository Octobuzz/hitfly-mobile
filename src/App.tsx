import React from 'react'
import './reactotron.config'
import { YellowBox } from 'react-native'
import { ThemeProvider } from 'styled-components'
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import AppNavigator from './navigation'
import { setupClient } from './apollo'
import theme from './theme'

// либы до сих пор используют это
YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillUpdate is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
])

class App extends React.Component<{}, { isReady: boolean }> {
  client?: ApolloClient<InMemoryCache>
  state = {
    isReady: false,
  }

  async componentDidMount() {
    this.client = await setupClient()
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
