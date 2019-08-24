import React, { Component } from 'react'
import { StyleSheet, Text } from 'react-native'
import Button from '../components/Button'
import InputText from '../components/InputText'
import { colors, sizes, style } from '../constants'

class AuthRecoveryPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      password: '12345',
      passwordRepeat: '12345',
    }
  }

  _onPressDone = () => {
    Navigator.popToRoot(this)
  }

  _onChangePassword = value => this._onChangeText(value, 'password')
  _onChangePasswordRepeat = value => this._onChangeText(value, 'passwordRepeat')

  _onChangeText = (value, stateName) => {
    this.setState({
      [stateName]: value,
    })
  }

  render() {
    return (
      <>
        <Text style={styles.description}>Введите новый пароль</Text>
        <InputText
          placeholder="Новый пароль"
          value={this.state.password}
          onChangeText={this._onChangePassword}
          rightIcon={InputText.icons.ICON_PASSWORD}
          styleWrapper={styles.inputWrapper}
          password
        />
        <InputText
          placeholder="Повторите пароль"
          value={this.state.passwordRepeat}
          onChangeText={this._onChangePasswordRepeat}
          rightIcon={InputText.icons.ICON_PASSWORD}
          styleWrapper={styles.inputWrapper}
          password
        />
        <Button
          type={Button.types.BUTTON_DEFAULT}
          label="Готово"
          styleWrapper={styles.roundedButtonWrapper}
          onPress={this._onPressDone}
        />
      </>
    )
  }
}

const styles = StyleSheet.create({
  description: {
    ...style.style.text.regular,
    fontSize: 16,
    lineHeight: 20,
    color: colors.GRAY_LABEL,
    textAlign: 'center',
    paddingTop: 8,
    paddingBottom: 24,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  roundedButtonWrapper: {
    marginVertical: sizes.CORRECT_PIXEL_RATIO_SIZE(12),
  },
})

export default AuthRecoveryPassword
