import R from 'ramda'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text } from 'react-native'
import { profileSelectors, requestLogIn } from '../redux/profile'
import { images, colors, sizes, style } from '../constants'

class Auth extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: 'some@email.com',
      password: '12345',
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.userName && this.props.userName) {
      Navigator.startTabBasedApp()
    }
  }

  _onPressLogin = () => {
    this.props.requestLogIn('Some User Name')
  }

  _onPressCreateAccount = () => {
    Navigator.push(this, screens.AUTH_CREATE_ACCOUNT)
  }

  _onPressForgotPassword = () => {
    Navigator.push(this, screens.AUTH_FORGOT_PASSWORD)
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
      <>
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
            text="или войдите через почту"
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
            type={Button.types.BUTTON_LINK}
            label="Я не помню пароль"
            onPress={this._onPressForgotPassword}
          />
          <Button
            type={Button.types.BUTTON_DEFAULT}
            label="Войти"
            styleWrapper={styles.roundedButtonWrapper}
            onPress={this._onPressLogin}
          />
          <Button
            type={Button.types.BUTTON_BORDERED}
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
      </>
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
    ...style.style.text.regular,
    fontSize: 12,
    color: colors.EXTRA_GRAY_LABEL,
    textAlign: 'center',
    paddingTop: 48,
  },
  licenseLink: {
    color: colors.BRAND_PINK,
  },
})

const mapStateToProps = R.applySpec({
  userName: profileSelectors.getUserName,
  isFetching: profileSelectors.getIsFetching,
})

const mapDispatchToProps = {
  requestLogIn,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Auth)
