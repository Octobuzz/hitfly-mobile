import React from 'react'
import { YellowBox } from 'react-native'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import AppNavigator from './navigation'
import { configureStore } from './redux'
import theme from './theme'

// либы до сих пор используют это
YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillUpdate is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
])

const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
})

// const store = configureStore()

const App = () => (
  <ApolloProvider client={client}>
    {/* <Provider store={store}> */}
    <ThemeProvider theme={theme}>
      <AppNavigator />
    </ThemeProvider>
    {/* </Provider> */}
  </ApolloProvider>
)

export default App
