import React from 'react'
import styled from 'src/styled-components'
import TextBase from 'src/components/TextBase'
import { Option } from './Dropdown'

const Text = styled(props => <TextBase {...props} />)`
  margin-bottom: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textAlt};
`

interface Props {
  option: Option
  onPress: (option: Option) => void
}

class DropdownItem extends React.Component<Props> {
  private handlePressItem = (): void => {
    const { onPress, option } = this.props
    onPress(option)
  }

  render() {
    const {
      option: { title },
    } = this.props

    return <Text onPress={this.handlePressItem}>{title}</Text>
  }
}

export default DropdownItem
