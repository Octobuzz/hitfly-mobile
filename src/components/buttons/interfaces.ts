import { ViewProps } from 'react-native'
export interface ButtonBase extends ViewProps {
  isDisabled?: boolean
  title: string
  onPress?: () => void
}
