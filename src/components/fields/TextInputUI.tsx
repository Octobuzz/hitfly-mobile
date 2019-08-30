import React from 'react'
import { TextInputProps } from 'react-native'
import { TextField } from 'react-native-material-textfield'
import { InputBase } from './interfaces'
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

class TextInputUI extends React.Component<InputBase & TextInputProps> {
  private renderAccessory = (): JSX.Element => {
    const { RightIcon } = this.props
    return RightIcon
  }

  render() {
    return <TextInput renderAccessory={this.renderAccessory} {...this.props} />
  }
}
export default TextInputUI
