import { render } from '../../jest/test-utils'
import { FormWrapper } from '../../src/components/views'
import React from 'react'
import { View } from 'react-native'
import { fireEvent } from '@testing-library/react-native'

describe('FormWrapper', () => {
  it('renders correctly', () => {
    const { asJSON } = render(<FormWrapper />)
    expect(asJSON()).toMatchSnapshot()
  })
  it('scrollEnabled should be false', () => {
    const { getByTestId } = render(
      <FormWrapper testID="formWrapper">
        <View style={{ height: 200 }} />
      </FormWrapper>,
    )

    fireEvent.layout(getByTestId('formWrapper'), {
      nativeEvent: { layout: { height: 400 } },
    })
    expect(getByTestId('formWrapper').props.scrollEnabled).toBe(false)
  })
  it('scrollEnabled should be true', () => {
    const { getByTestId, debug } = render(
      <FormWrapper style={{ height: 400 }} testID="formWrapper">
        <View style={{ height: 600 }} />
      </FormWrapper>,
    )
    const formWrapper = getByTestId('formWrapper')

    debug(formWrapper)
    expect(formWrapper.props.scrollEnabled).toBe(true)
  })
})
