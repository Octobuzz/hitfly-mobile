import { StyleProp, ViewStyle } from 'react-native'

export interface InputBase {
  onPress?: () => void
  defaultValue?: string
  editable?: boolean
  RightIcon: JSX.Element
  label: string
  error?: string
  style?: any
  containerStyle?: StyleProp<ViewStyle>
}

export interface CheckBoxProps {
  error?: string
  style?: StyleProp<ViewStyle>
}
