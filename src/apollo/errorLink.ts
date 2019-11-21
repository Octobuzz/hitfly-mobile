import { Alert } from 'react-native'
import { GraphQLError } from 'graphql'
import { onError } from 'apollo-link-error'
import { AuthErrorPanelRef } from 'src/globalRefs'

const handle401Error = (error: GraphQLError) => {
  AuthErrorPanelRef.showPanel()
}

const handleGraphQLErrors = (errors: readonly GraphQLError[]) => {
  errors.forEach(error => {
    const { message } = error
    // костыль с бэка, по другому ошибку не выявить
    if (message === 'Unauthorized') {
      handle401Error(error)
    }
  })
}

export default onError(({ networkError, graphQLErrors }) => {
  if (networkError) {
    Alert.alert('Ошибка сети', networkError.message)
  }

  if (graphQLErrors) {
    handleGraphQLErrors(graphQLErrors)
  }
})
