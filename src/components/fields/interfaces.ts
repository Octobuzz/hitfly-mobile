export interface InputBase {
  onPress?: () => void
  defaultValue?: string
  editable?: boolean
  RightIcon: JSX.Element
  label: string
  error?: string
  style?: any
}
