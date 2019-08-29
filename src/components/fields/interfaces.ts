import { StyleProp, View } from 'react-native'

export interface InputBase {
  onPress?: () => void
  defaultValue?: string
  editable?: boolean
  RightIcon: JSX.Element
  label: string
  error?: string
  style?: any
}

export interface CheckBoxProps {
  error?: string
  style?: StyleProp<View>
}
