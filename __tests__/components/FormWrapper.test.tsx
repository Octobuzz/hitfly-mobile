import React from 'react'
import { render, fireEvent, NativeTestEvent } from '../../jest/test-utils'
import { FormWrapper } from 'src/components/views'

describe('FormWrapper', () => {
  it('renders correctly', () => {
    const { asJSON } = render(<FormWrapper />)
    expect(asJSON()).toMatchSnapshot()
  })

  it('scrollEnabled should be false', () => {
    const FORM_HEIGHT = 400
    const VIEW_HEIGHT = 200
    const { getByTestId } = render(<FormWrapper />)

    const wrapper = getByTestId('scrollView')

    fireEvent.layout(wrapper, {
      nativeEvent: { layout: { height: FORM_HEIGHT } },
    })
    fireEvent(wrapper, new NativeTestEvent('contentSizeChange', 1, VIEW_HEIGHT))

    expect(wrapper.getProp('scrollEnabled')).toBeFalsy()
  })

  it('scrollEnabled should be true', () => {
    const FORM_HEIGHT = 400
    const VIEW_HEIGHT = 600
    const { getByTestId } = render(<FormWrapper />)
    const wrapper = getByTestId('scrollView')

    fireEvent.layout(wrapper, {
      nativeEvent: { layout: { height: FORM_HEIGHT } },
    })
    fireEvent(wrapper, new NativeTestEvent('contentSizeChange', 1, VIEW_HEIGHT))

    expect(wrapper.getProp('scrollEnabled')).toBeTruthy()
  })

  it('scrollEnabled should be true if keyboard is shown', () => {
    const { getByTestId } = render(<FormWrapper />)
    const wrapper = getByTestId('scrollView')

    fireEvent(wrapper, new NativeTestEvent('keyboardWillShow'))

    expect(wrapper.getProp('scrollEnabled')).toBeTruthy()
  })
})
