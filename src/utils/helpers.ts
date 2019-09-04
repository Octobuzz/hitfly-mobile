import L from 'lodash'

export const delay = (ms: number): Promise<void> =>
  new Promise(res => setTimeout(res, ms))

type Validation = Record<string, string[]>

interface FormErrorsInput {
  graphQLErrors: [
    {
      validation: Validation
    },
  ]
}
type FormErrorsOutput = Record<string, string>

export const transformFormErrors = (
  error: FormErrorsInput,
): FormErrorsOutput => {
  const validation: Validation | undefined = L.get(
    error,
    'graphQLErrors[0].validation',
  )
  if (!validation) {
    return {}
  }

  const result = L.mapValues(validation, value => value.join('\n'))

  return result
}
