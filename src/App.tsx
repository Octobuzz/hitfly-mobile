import React from 'react'
import { YellowBox } from 'react-native'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import AppNavigator from './navigation'
import { configureStore } from './redux'
import theme from './theme'

// либы до сих пор используют это
YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillUpdate is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
])

const store = configureStore()

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <AppNavigator />
    </ThemeProvider>
  </Provider>
)

export default App
