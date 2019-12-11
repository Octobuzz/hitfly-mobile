import React from 'react'
import RNModal, { ModalProps } from 'react-native-modal'
import styled from 'src/styled-components'
import { View } from './views'

const Inner = styled(View).attrs(() => ({
  noFill: true,
}))`
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.black};
`

interface Props
  extends Partial<
    Omit<
      ModalProps,
      | 'isVisible'
      | 'useNativeDriver'
      | 'onBackdropPress'
      | 'onBackButtonPress'
      | 'hideModalContentWhileAnimating'
    >
  > {
  onClose?: () => void
}

interface State {
  isVisible: boolean
}

class Modal extends React.Component<Props, State> {
  state: State = {
    isVisible: false,
  }

  show = (): void => {
    this.setState({ isVisible: true })
  }

  hide = (): void => {
    this.setState({ isVisible: false })
  }

  render() {
    const { children, onClose, ...rest } = this.props
    const { isVisible } = this.state
    return (
      <RNModal
        useNativeDriver
        hideModalContentWhileAnimating={true}
        isVisible={isVisible}
        onBackButtonPress={onClose}
        onBackdropPress={onClose}
        {...rest}
      >
        <Inner>{children}</Inner>
      </RNModal>
    )
  }
}

export default Modal
