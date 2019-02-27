import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  Image,
  View,
  Platform,
  TouchableOpacity,
} from 'react-native'
import { images, colors } from '../constants'
import { Navigator } from '../navigation'

export const NAV_BAR_BUTTON_ARROW_BACK_WHITE = 'NAV_BAR_BUTTON_ARROW_BACK_WHITE'
export const NAV_BAR_BUTTON_ARROW_BACK_BLACK = 'NAV_BAR_BUTTON_ARROW_BACK_BLACK'
export const NAV_BAR_BUTTON_SHEVRON_DOWN_WHITE =
  'NAV_BAR_BUTTON_SHEVRON_DOWN_WHITE'
export const NAV_BAR_BUTTON_SETTINGS_WHITE = 'NAV_BAR_BUTTON_SETTINGS_WHITE'
export const NAV_BAR_BUTTON_USER_AVATAR = 'NAV_BAR_BUTTON_USER_AVATAR'
export const NAV_BAR_BUTTON_ANDROID_OFFSET = 'NAV_BAR_BUTTON_ANDROID_OFFSET'

class NavBarButton extends Component {
  _renderArrowBack = (isWhite = true) => {
    return (
      <TouchableOpacity
        style={[styles.buttonContainer, styles.backButton]}
        onPress={() => Navigator.pop(this.props.screenId)}
      >
        <Image
          source={
            isWhite
              ? images.NAVBAR_BACK_ARROW_WHITE
              : images.NAVBAR_BACK_ARROW_BLACK
          }
          resizeMode="contain"
          style={styles.backImage}
        />
      </TouchableOpacity>
    )
  }

  _renderShevronDown = () => {
    return (
      <TouchableOpacity
        style={[styles.buttonContainer, styles.shevronDownButton]}
      >
        <Image
          source={images.NAVBAR_SHEVRON_DOWN_WHITE}
          resizeMode="contain"
          style={styles.shevronDownImage}
        />
      </TouchableOpacity>
    )
  }

  _renderSettings = () => {
    return (
      <TouchableOpacity style={[styles.buttonContainer, styles.settingsButton]}>
        <Image
          source={images.NAVBAR_SETTINGS_WHITE}
          resizeMode="contain"
          style={styles.settingsImage}
        />
      </TouchableOpacity>
    )
  }

  _renderUserAvatar = () => {
    return (
      <TouchableOpacity style={[styles.buttonContainer, styles.avatarButton]}>
        <Image
          source={images.NAVBAR_AVATAR_EMPTY}
          resizeMode="contain"
          style={styles.avatarImage}
        />
      </TouchableOpacity>
    )
  }

  _renderAndroidOffset = () => {
    return <View style={[styles.buttonContainer, styles.androidOffset]} />
  }

  render() {
    switch (this.props.type) {
      case NAV_BAR_BUTTON_ARROW_BACK_WHITE:
        return this._renderArrowBack(true)
      case NAV_BAR_BUTTON_ARROW_BACK_BLACK:
        return this._renderArrowBack(false)
      case NAV_BAR_BUTTON_SHEVRON_DOWN_WHITE:
        return this._renderShevronDown()
      case NAV_BAR_BUTTON_SETTINGS_WHITE:
        return this._renderSettings()
      case NAV_BAR_BUTTON_USER_AVATAR:
        return this._renderUserAvatar()
      case NAV_BAR_BUTTON_ANDROID_OFFSET:
        return this._renderAndroidOffset()
      default:
        return null
    }
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      android: {
        marginRight: 8,
      },
    }),
  },
  androidOffset: {
    width: 16,
    marginRight: 0,
    backgroundColor: colors.FUCKING_ANDROID,
  },
  backButton: {
    width: 32,
    height: 32,
  },
  backImage: {
    width: 26,
    height: 18,
  },
  shevronDownButton: {},
  shevronDownImage: {
    width: 22,
    height: 12,
  },
  settingsButton: {},
  settingsImage: {
    width: 24,
    height: 24,
  },
  avatarButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    padding: 4,
    backgroundColor: colors.WHITE_40,
  },
  avatarImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
})

NavBarButton.propTypes = {
  type: PropTypes.string,
  screenId: PropTypes.string,
  androidRightOffset: PropTypes.bool,
}

NavBarButton.defaultProps = {
  type: '',
  screenId: '',
  androidRightOffset: false,
}
export default NavBarButton
