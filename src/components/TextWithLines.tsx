import React from 'react'
import TextBase from 'src/components/TextBase'
import styled from 'src/styled-components'

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
`

const Line = styled.View`
  height: 1px;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.inputBorder};
`

const Text = styled(TextBase)`
  color: ${({ theme }) => theme.colors.textAlt};
  margin-horizontal: 6px;
`

interface Props {
  children?: string
  style?: any
}

const TextWithLines = ({ children, style }: Props) => (
  <Wrapper style={style}>
    <Line />
    <Text>{children}</Text>
    <Line />
  </Wrapper>
)

export default TextWithLines
