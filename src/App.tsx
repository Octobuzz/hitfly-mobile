import React from 'react'
import './rn-debugger.config'
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
  'Warning: componentWillMount',
  'Warning: componentWillUpdate',
  'Warning: componentWillReceiveProps',
  'cancelTouches',
])

class App extends React.Component {
  client?: ApolloClient<InMemoryCache>

  async componentDidMount() {
    this.client = await setupClient()
    this.forceUpdate()
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
