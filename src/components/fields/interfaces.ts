import { StyleProp, ViewStyle } from 'react-native'

export interface InputBase {
  onPress?: () => void
  onChangeText?: (text: string) => void
  onBlur?: (e: any) => void
  onFocus?: (e: any) => void
  value?: string
  defaultValue?: string
  editable?: boolean
  RightIcon?: JSX.Element
  label?: string
  error?: string
  style?: any
  containerStyle?: StyleProp<ViewStyle>
  forwardRef?: any
}

export interface CheckBoxProps {
  error?: string
  style?: StyleProp<ViewStyle>
}
