import React from 'react'
import { Keyboard } from 'react-native'
import { FieldProps } from 'formik'
import DateTimePicker, {
  DateTimePickerProps,
} from 'react-native-modal-datetime-picker'
import { format, startOfDay, parse } from 'date-fns'
import TextInputUI from './TextInputUI'
import { InputBase } from './interfaces'

interface Props extends InputBase, DateTimePickerProps, FieldProps {}
interface State {
  isVisible: boolean
}

class DatePicker extends React.Component<Props, State> {
  state: State = { isVisible: false }

  private getInitialDate = (): Date | undefined => {
    const {
      field: { value },
      maximumDate,
    } = this.props
    if (value) {
      return parse(value, 'dd.MM.yyyy', new Date())
    }
    if (maximumDate) {
      return maximumDate
    }
  }

  private getError = (): string | undefined => {
    const {
      form: { errors, touched },
      field: { name },
    } = this.props
    const error = errors[name]
    const touch = touched[name]
    if (touch && error) {
      return error as string
    }
  }

  private handleCancel = (): void => {
    const {
      field: { name },
      form: { setFieldTouched },
    } = this.props
    setFieldTouched(name, true)
    this.setState({ isVisible: false })
  }
  private handleConfirm = (date: Date): void => {
    const {
      form: { setFieldValue },
      field: { name },
    } = this.props
    this.setState({ isVisible: false })
    setFieldValue(name, format(startOfDay(date), 'dd.MM.yyyy'))
  }

  private showDatePicker = (): void => {
    Keyboard.dismiss()
    this.setState({ isVisible: true })
  }

  render() {
    const {
      maximumDate,
      minimumDate,
      field: { onBlur, onChange, name, value },
      form,
      ...rest
    } = this.props
    const { isVisible } = this.state
    const error = this.getError()
    const date = this.getInitialDate()

    return (
      <>
        <TextInputUI
          value={value}
          onChangeText={onChange(name)}
          onBlur={onBlur(name)}
          onFocus={this.showDatePicker}
          error={error}
          {...rest}
        />
        <DateTimePicker
          confirmTextIOS="Подтвердить"
          cancelTextIOS="Отмена"
          titleIOS="Выберите дату"
          isVisible={isVisible}
          onConfirm={this.handleConfirm}
          onCancel={this.handleCancel}
          locale="ru"
          maximumDate={maximumDate}
          minimumDate={minimumDate}
          date={date}
        />
      </>
    )
  }
}

export default DatePicker
