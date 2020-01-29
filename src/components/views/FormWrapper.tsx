import React from 'react'
import { LayoutChangeEvent } from 'react-native'
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-aware-scroll-view'
import ScrollView from './ScrollView'
import { IView } from './interfaces'

interface Props extends KeyboardAwareScrollViewProps, IView {}

class FormWrapper extends React.Component<Props> {
  state = {
    scrollHeight: 0,
    contentHeight: 0,
    keyboardShown: false,
  }

  private handleLayout = ({
    nativeEvent: {
      layout: { height },
    },
  }: LayoutChangeEvent): void => {
    this.setState({
      scrollHeight: height,
    })
  }
  private handleSizeChange = (w: number, h: number): void => {
    this.setState({
      contentHeight: h,
    })
  }
  private handleKeyboardWillShow = (): void => {
    this.setState({ keyboardShown: true })
  }
  private handleKeyboardDidHide = (): void => {
    this.setState({ keyboardShown: false })
  }

  render() {
    const { scrollHeight, contentHeight, keyboardShown } = this.state
    return (
      // @ts-ignore
      <ScrollView
        as={KeyboardAwareScrollView}
        {...this.props}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={keyboardShown || contentHeight > scrollHeight}
        onLayout={this.handleLayout}
        onContentSizeChange={this.handleSizeChange}
        onKeyboardWillShow={this.handleKeyboardWillShow}
        onKeyboardDidHide={this.handleKeyboardDidHide}
        testID="scrollView"
      />
    )
  }
}

export default FormWrapper
