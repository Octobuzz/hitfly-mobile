import React from 'react'
import { FieldProps } from 'formik'
import CheckBoxUI from './CheckBoxUI'
import { CheckBoxProps } from './interfaces'

class CheckBox extends React.Component<FieldProps & CheckBoxProps> {
  private toggleCheck = (): void => {
    const {
      field: { name, value },
      form: { setFieldValue },
    } = this.props
    setFieldValue(name, !value)
  }

  render() {
    const {
      style,
      children,
      field: { value },
    } = this.props
    return (
      <CheckBoxUI style={style} isChecked={value} onPress={this.toggleCheck}>
        {children}
      </CheckBoxUI>
    )
  }
}

export default CheckBox
