import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import Button from '../components/Button'
import InputText from '../components/InputText'
import { colors, sizes, style } from '../constants'

class AuthCreateAccountParams extends Component {
  constructor(props) {
    super(props)
    this.state = {
      years: '18',
    }
  }

  _onPressNext = () => {
    Navigator.push(this, screens.AUTH_CREATE_ACCOUNT_CATEGORIES)
  }

  _onChangeYears = value => this._onChangeText(value, 'years')

  _onChangeText = (value, stateName) => {
    this.setState({
      [stateName]: value,
    })
  }

  render() {
    return (
      <>
        <InputText
          placeholder="Возраст"
          mask={InputText.masks.MASK_NUMBERS_2}
          value={this.state.years}
          onChangeText={this._onChangeYears}
          rightIcon={InputText.icons.ICON_CALENDAR}
          styleWrapper={styles.inputWrapper}
        />
        <InputText
          placeholder="Пол"
          buttonMode
          value="Женский"
          rightIcon={InputText.icons.ICON_SHEVRON_DOWN}
          styleWrapper={styles.inputWrapper}
          password
        />
        <Button
          type={Button.types.BUTTON_DEFAULT}
          label="Далее"
          styleWrapper={styles.roundedButtonWrapper}
          onPress={this._onPressNext}
        />
      </>
    )
  }
}

const styles = StyleSheet.create({
  inputWrapper: {
    marginBottom: 16,
  },
  roundedButtonWrapper: {
    marginVertical: sizes.CORRECT_PIXEL_RATIO_SIZE(12),
  },
  license: {
    ...style.text.regular,
    fontSize: 12,
    color: colors.EXTRA_GRAY_LABEL,
    textAlign: 'center',
    paddingTop: 64,
  },
  licenseLink: {
    color: colors.BRAND_PINK,
  },
})

export default AuthCreateAccountParams