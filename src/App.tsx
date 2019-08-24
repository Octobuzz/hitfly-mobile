import React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import AppNavigator from './navigation'
import { configureStore } from './redux'
import theme from './theme'

const store = configureStore()

// const App = () => (
//   <Provider store={store}>
//     <ThemeProvider theme={theme}>
//       <AppNavigator />
//     </ThemeProvider>
//   </Provider>
// )

const App = () => null

export default App
