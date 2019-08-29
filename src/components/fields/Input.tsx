import React from 'react'
import { FieldProps } from 'formik'
import { InputBase } from './interfaces'
import TextInputUI from './TextInputUI'

class Input extends React.Component<InputBase & FieldProps> {
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
      field: { name, value, onChange, onBlur },
      form,
      ...rest
    } = this.props
    const error = this.getError()
    return (
      <TextInputUI
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
