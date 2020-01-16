import { Alert } from 'react-native'
import { Operation } from 'apollo-link'
import { GraphQLError } from 'graphql'
import { onError } from 'apollo-link-error'
import {
  AuthErrorModalRef,
  closeOpenedModalsForAuthModal,
} from 'src/globalRefs'

const handle401Error = async (error: GraphQLError, operation: Operation) => {
  // FIXME: это костыль так как я не понял почему не вытаскивает профиль
  // пришедший после мутации логина
  if (operation.operationName === 'ProfileAvatar') {
    return
  }

  await closeOpenedModalsForAuthModal()

  AuthErrorModalRef.show()
}

const handleGraphQLErrors = (
  errors: readonly GraphQLError[],
  operation: Operation,
) => {
  errors.forEach(error => {
    const { message } = error
    // костыль с бэка, по другому ошибку не выявить
    if (message === 'Unauthorized') {
      handle401Error(error, operation)
    }
  })
}

export default onError(({ networkError, graphQLErrors, operation }) => {
  if (networkError) {
    Alert.alert('Ошибка сети', networkError.message)
  }

  if (graphQLErrors) {
    handleGraphQLErrors(graphQLErrors, operation)
  }
})
