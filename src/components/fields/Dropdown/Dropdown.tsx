import React from 'react'
import Collapsible from 'react-native-collapsible'
import { FieldProps } from 'formik'
import Icon from 'react-native-vector-icons/Feather'
import TextInputUI from '../TextInputUI'
import { InputBase } from '../interfaces'
import styled from 'src/styled-components'
import DropdownItem from './DropdownItem'

const Wrapper = styled.View``

const StyledCollapsible = styled(Collapsible)`
  border-color: ${({ theme }) => theme.colors.inputBorder};
  padding-horizontal: 8px;
`

const TouchableWrapper = styled.TouchableOpacity``

export interface Option {
  title: string
  value: string
}

interface Props extends InputBase, FieldProps {
  options: Option[]
}
interface State {
  isCollapsed: boolean
  inputValue: string
}

class Dropdown extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { isCollapsed: true, inputValue: props.options[0].title }
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

  private selectItem = (option: Option): void => {
    const {
      form: { setFieldValue },
      field: { name },
    } = this.props
    this.setState({ isCollapsed: true, inputValue: option.title })
    setFieldValue(name, option.value)
  }

  private toggleDropdown = (): void => {
    this.setState((state: State) => ({ isCollapsed: !state.isCollapsed }))
  }

  private renderItem = (option: Option): JSX.Element => (
    <DropdownItem
      key={option.value}
      option={option}
      onPress={this.selectItem}
    />
  )

  private getRightIcon = (): JSX.Element => {
    const { isCollapsed } = this.state
    const name = isCollapsed ? 'chevron-down' : 'chevron-up'
    return <Icon size={20} name={name} />
  }

  render() {
    const { form, field, options, containerStyle, ...rest } = this.props
    const { isCollapsed, inputValue } = this.state
    const error = this.getError()
    const RightIcon = this.getRightIcon()
    return (
      <Wrapper style={containerStyle}>
        <TouchableWrapper onPress={this.toggleDropdown}>
          <TextInputUI
            editable={false}
            value={inputValue}
            error={error}
            RightIcon={RightIcon}
            {...rest}
          />
        </TouchableWrapper>
        <StyledCollapsible collapsed={isCollapsed}>
          {options.map(this.renderItem)}
        </StyledCollapsible>
      </Wrapper>
    )
  }
}

export default Dropdown
