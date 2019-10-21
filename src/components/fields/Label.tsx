import React from 'react'
import TextBase from 'src/components/TextBase'
import styled from 'src/styled-components'

interface Props {
  children: string
}

const Text = styled(props => <TextBase {...props} />)`
  color: ${({ theme }) => theme.colors.textGray};
  font-size: 10px;
`

const Label = ({ children }: Props) => <Text>{children}</Text>

export default Label
