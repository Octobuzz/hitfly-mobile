import { FieldProps } from 'formik'

export interface InputBase extends FieldProps {
  defaultValue?: string
  editable?: boolean
  RightIcon: JSX.Element
  label: string
  style?: any
}
