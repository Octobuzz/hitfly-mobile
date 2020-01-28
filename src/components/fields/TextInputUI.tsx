import React, { useRef, useEffect } from 'react'
import { TextInputProps } from 'react-native'
import { OutlinedTextField } from 'react-native-material-textfield'
import { InputBase } from './interfaces'
import styled from 'src/styled-components'

const TextInput = styled(OutlinedTextField).attrs(({ theme }) => ({
  selectionColor: theme.colors.textMain,
  textColor: theme.colors.textMain,
  tintColor: theme.colors.brandPink,
  labelTextStyle: {
    fontFamily: theme.fonts.regular,
  },
}))`
  color: ${({ theme }) => theme.colors.textMain};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 12px;
`

const TextInputUI: React.FC<InputBase & TextInputProps> = ({
  value,
  forwardRef,
  RightIcon,
  ...rest
}) => {
  const renderRightAccessory = (): JSX.Element => RightIcon

  const ref = useRef(null)

  useEffect(() => {
    if (forwardRef) {
      forwardRef.current = ref.current
    }
  }, [forwardRef])

  useEffect(() => {
    if (ref.current) {
      // @ts-ignore
      ref.current.setValue(value)
    }
  }, [value])

  return (
    <TextInput
      ref={ref}
      renderRightAccessory={renderRightAccessory}
      {...rest}
    />
  )
}
export default TextInputUI
