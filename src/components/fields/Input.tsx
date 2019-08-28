import React from 'react'
import Label from './Label'
import { InputBase } from './interfaces'
import styled from 'src/styled-components'

const Wrapper = styled.View`
  border-radius: 4px;
  padding: 11px 16px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.inputBorder};
  flex-direction: row;
  align-items: center;
`

const Inner = styled.View`
  flex: 1;
`

const TextInput = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.colors.textGray,
}))`
  color: ${({ theme }) => theme.colors.textMain};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 12px;
`

class Input extends React.Component<InputBase> {
  render() {
    const {
      label,
      style,
      RightIcon,
      field: { name, value, onChange, onBlur },
    } = this.props
    return (
      <Wrapper style={style}>
        <Inner>
          <Label>{label}</Label>
          <TextInput
            onChangeText={onChange(name)}
            onBlur={onBlur(name)}
            value={value}
            defaultValue={value}
          />
        </Inner>
        {RightIcon}
      </Wrapper>
    )
  }
}

export default Input
