import R from 'ramda'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { StyleSheet, View, Text } from 'react-native'
import Navigator from '../navigation/Navigator'
import { profileSelectors, requestLogIn } from '../redux/profile'
import Button from '../components/Button'
import InputText from '../components/InputText'
import TextWithLines from '../components/TextWithLines'
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

  _onChangeEmail = value => this._onChangeText(value, 'email')
  _onChangePassword = value => this._onChangeText(value, 'password')

  _onChangeText = (value, stateName) => {
    this.setState({
      [stateName]: value,
    })
  }

  render() {
    return (
      <View style={styles.wrapper}>
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
            onPress={() => {}}
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
            onPress={() => {}}
          />
        </View>
        <Text style={styles.license}>
          Авторизовываясь через эл.почту, Facebook, VK, Google или Одноклассники
          вы принимаете
          <Text style={styles.licenseLink}> Условия использования</Text> и
          <Text style={styles.licenseLink}> Политику конфиденциальности</Text>
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
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
    paddingTop: 24,
  },
  licenseLink: {
    color: colors.BRAND_PINK,
  },
})

Auth.propTypes = {
  requestLogIn: PropTypes.func,
  userName: PropTypes.string,
  isFetching: PropTypes.bool,
}

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
