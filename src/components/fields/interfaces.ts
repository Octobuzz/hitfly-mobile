import { ReactNode } from 'react'
import { FieldProps } from 'formik'

export interface InputBase extends FieldProps {
  defaultValue?: string
  editable?: boolean
  RightIcon: ReactNode
  label: string
  style?: any
}
