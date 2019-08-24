import R from 'ramda'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text } from 'react-native'
import { Navigator, screens } from '../navigation'
import Button from '../components/Button'
import InputText from '../components/InputText'
import TextWithLines from '../components/TextWithLines'
import Wrapper from '../containers/Wrapper'
import { images, colors, sizes, style } from '../constants'

class AuthCreateAccount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: 'some@email.com',
      password: '12345',
    }
  }

  _onPressCreateAccount = () => {
    Navigator.push(this, screens.AUTH_CREATE_ACCOUNT_PARAMS)
  }

  _onChangeEmail = value => this._onChangeText(value, 'email')
  _onChangePassword = value => this._onChangeText(value, 'password')

  _onChangeText = (value, stateName) => {
    this.setState({
      [stateName]: value,
    })
  }

  render() {
    return (
      <Wrapper scrollKeyboard>
        <View style={styles.authControls}>
          <View style={styles.socialRow}>
            <Button
              type={Button.types.BUTTON_ICON}
              icon={images.SOCIAL_FACEBOOK}
              styleWrapper={styles.socialButtonWrapper}
              styleIconContainer={styles.socialButtonIconContainer}
              onPress={() => {}}
            />
            <Button
              type={Button.types.BUTTON_ICON}
              icon={images.SOCIAL_VKONTAKTE}
              styleWrapper={styles.socialButtonWrapper}
              styleIconContainer={styles.socialButtonIconContainer}
              onPress={() => {}}
            />
            <Button
              type={Button.types.BUTTON_ICON}
              icon={images.SOCIAL_GOOGLE}
              styleWrapper={styles.socialButtonWrapper}
              styleIconContainer={styles.socialButtonIconContainer}
              onPress={() => {}}
            />
            <Button
              type={Button.types.BUTTON_ICON}
              icon={images.SOCIAL_ODNOKLASSNIKI}
              styleWrapper={styles.socialButtonWrapper}
              styleIconContainer={styles.socialButtonIconContainer}
              onPress={() => {}}
            />
          </View>
          <TextWithLines
            text="или зарегистрируйтесь через почту"
            styleWrapper={styles.textWithLinesWrapper}
          />
          <InputText
            placeholder="E-mail"
            value={this.state.email}
            onChangeText={this._onChangeEmail}
            rightIcon={InputText.icons.ICON_EMAIL}
            styleWrapper={styles.inputWrapper}
          />
          <InputText
            placeholder="Пароль"
            value={this.state.password}
            onChangeText={this._onChangePassword}
            rightIcon={InputText.icons.ICON_PASSWORD}
            styleWrapper={styles.inputWrapper}
            password
          />
          <Button
            type={Button.types.BUTTON_DEFAULT}
            label="Создать аккаунт"
            styleWrapper={styles.roundedButtonWrapper}
            onPress={this._onPressCreateAccount}
          />
        </View>
        <Text style={styles.license}>
          Авторизовываясь через эл.почту, Facebook, VK, Google или Одноклассники
          вы принимаете
          <Text style={styles.licenseLink}> Условия использования</Text> и
          <Text style={styles.licenseLink}> Политику конфиденциальности</Text>
        </Text>
      </Wrapper>
    )
  }
}

const styles = StyleSheet.create({
  authControls: {
    width: '100%',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialButtonWrapper: {
    paddingHorizontal: 8,
  },
  socialButtonIconContainer: {
    width: sizes.BUTTON_HEIGHT,
    height: sizes.BUTTON_HEIGHT,
  },
  textWithLinesWrapper: {
    marginTop: 24,
    marginBottom: 16,
  },
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

const mapStateToProps = R.applySpec({})

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthCreateAccount)
