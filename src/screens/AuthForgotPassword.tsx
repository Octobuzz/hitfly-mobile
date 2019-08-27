import R from 'ramda'
import React, { Component } from 'react'
import { StyleSheet, Text } from 'react-native'
import Button from '../components/Button'
import InputText from '../components/InputText'
import { colors, sizes, style } from '../constants'

class AuthForgotPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: 'some@email.com',
    }
  }

  _onPressSend = () => {
    Navigator.push(this, screens.AUTH_RECOVERY_PASSWORD)
  }

  _onChangeEmail = value => this._onChangeText(value, 'email')

  _onChangeText = (value, stateName) => {
    this.setState({
      [stateName]: value,
    })
  }

  render() {
    return (
      <>
        <Text style={styles.description}>
          Введите ваш e–mail и мы отправим вам письмо с инструкцией по
          восстановлению пароля
        </Text>
        <InputText
          placeholder="E-mail"
          value={this.state.email}
          onChangeText={this._onChangeEmail}
          rightIcon={InputText.icons.ICON_EMAIL}
          styleWrapper={styles.inputWrapper}
        />
        <Button
          type={Button.types.BUTTON_LINK}
          label="Отправить пароль еще раз"
          onPress={this._onPressSend}
        />
        <Button
          type={Button.types.BUTTON_DEFAULT}
          label="Отправить"
          styleWrapper={styles.roundedButtonWrapper}
          onPress={this._onPressSend}
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

export default AuthForgotPassword
