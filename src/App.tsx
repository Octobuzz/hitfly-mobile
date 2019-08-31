import React from 'react'
import './reactotron.config'
import { YellowBox } from 'react-native'
import { ThemeProvider } from 'styled-components'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import AppNavigator from './navigation'
import theme from './theme'

// либы до сих пор используют это
YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillUpdate is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
])

const client = new ApolloClient({
  uri: 'http://digico.itech-test.ru/graphql',
})

const App = () => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <AppNavigator />
    </ThemeProvider>
  </ApolloProvider>
)

export default App
