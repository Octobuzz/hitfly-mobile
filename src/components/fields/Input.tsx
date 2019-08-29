import React from 'react'
import { InputBase } from './interfaces'
import { TextField } from 'react-native-material-textfield'
import styled from 'src/styled-components'

const TextInput = styled(TextField).attrs(({ theme }) => ({
  placeholderTextColor: theme.colors.textGray,
  selectionColor: theme.colors.textMain,
  textColor: theme.colors.textMain,

  labelTextStyle: {
    fontFamily: theme.fonts.regular,
  },
  labelHeight: 20,
}))`
  color: ${({ theme }) => theme.colors.textMain};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 12px;
`

class Input extends React.Component<InputBase> {
  private renderAccessory = (): JSX.Element => {
    const { RightIcon } = this.props
    return RightIcon
  }

  private getError = (): string | undefined => {
    const {
      form: { errors, touched },
      field: { name },
    } = this.props
    const error = errors[name]
    const touch = touched[name]
    if (touch && error) {
      return error as string
    }
  }

  render() {
    const {
      label,
      RightIcon,
      field: { name, value, onChange, onBlur },
      form,
      ...rest
    } = this.props
    const error = this.getError()
    return (
      <TextInput
        renderAccessory={this.renderAccessory}
        label={label}
        onChangeText={onChange(name)}
        onBlur={onBlur(name)}
        value={value}
        defaultValue={value}
        error={error}
        {...rest}
      />
    )
  }
}

export default Input
