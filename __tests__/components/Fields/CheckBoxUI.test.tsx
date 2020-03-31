import React from 'react'
import { CheckBoxUI } from 'src/components'
import {
  render,
  fireEvent,
  ReactTestInstanceExtended,
} from '../../../jest/test-utils'

describe('CheckBoxUI', () => {
  it('renders correctly in checked state', () => {
    const { container } = render(<CheckBoxUI isChecked>test</CheckBoxUI>)

    expect(container.children[0] as ReactTestInstanceExtended).toMatchSnapshot()
  })

  it('renders correctly in unchecked state', () => {
    const { container } = render(<CheckBoxUI>test</CheckBoxUI>)

    expect(container.children[0] as ReactTestInstanceExtended).toMatchSnapshot()
  })

  it('can be pressed in checked state', () => {
    const onPress = jest.fn()
    const { getByTestId } = render(
      <CheckBoxUI onPress={onPress} isChecked>
        test
      </CheckBoxUI>,
    )

    fireEvent.press(getByTestId('wrapper'))
    expect(onPress).toHaveBeenCalled()
  })

  it('can be pressed in unchecked state', () => {
    const onPress = jest.fn()
    const { getByTestId } = render(
      <CheckBoxUI onPress={onPress}>test</CheckBoxUI>,
    )

    fireEvent.press(getByTestId('wrapper'))
    expect(onPress).toHaveBeenCalled()
  })
})
