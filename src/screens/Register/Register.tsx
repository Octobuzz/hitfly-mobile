import React from 'react'
import { FormWrapper, SafeView } from 'src/components'
import { SocialAuth } from 'src/containers'
import RegisterForm from './RegisterForm'
import styled from 'src/styled-components'

const IndentedSocialAuth = styled(SocialAuth)`
  margin-bottom: 24px;
`

interface Props {
  onSubmit: (values: any) => Promise<any>
}

const Register: React.FC<Props> = ({ onSubmit }) => (
  <SafeView>
    <FormWrapper>
      <IndentedSocialAuth bottomText="или зарегистрируйтесь через почту" />
      <RegisterForm onSubmit={onSubmit} />
    </FormWrapper>
  </SafeView>
)

export default Register
