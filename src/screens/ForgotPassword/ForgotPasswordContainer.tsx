import React, { useCallback } from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { useMutation } from '@apollo/react-hooks'
import ForgotPasswordScreen from './ForgotPassword'
import { routes } from 'src/constants'
import gql from 'graphql-tag'

const RESET = gql`
  mutation Reset($email: String!) {
    resetPassword: resetPasswordMutation(email: $email)
  }
`

interface Props extends NavigationStackScreenProps {}

const ForgotPasswordContainer: React.FC<Props> = props => {
  const [resetPassword] = useMutation(RESET)

  const onSubmit = useCallback(async values => {
    await resetPassword({ variables: values })
    props.navigation.navigate(routes.AUTH.RECOVERY_INFO, values)
  }, [])

  return <ForgotPasswordScreen onSubmit={onSubmit} {...props} />
}

export default ForgotPasswordContainer
