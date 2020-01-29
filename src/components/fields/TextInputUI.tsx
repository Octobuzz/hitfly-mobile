import React, { useRef, useEffect } from 'react'
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
  titleTextStyle: {
    fontFamily: theme.fonts.regular,
    fontSize: 12,
  },
}))``

const TextInputUI: React.FC<InputBase> = ({
  value,
  forwardRef,
  RightIcon,
  ...rest
}) => {
  const renderRightAccessory = RightIcon
    ? (): JSX.Element => RightIcon
    : undefined

  const ref = useRef<OutlinedTextField>(null)

  useEffect(() => {
    if (forwardRef) {
      forwardRef.current = ref.current
    }
  }, [forwardRef])

  useEffect(() => {
    ref.current?.setValue(value)
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
