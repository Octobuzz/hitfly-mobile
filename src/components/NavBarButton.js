import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  Image,
  View,
  Text,
  Platform,
  TouchableOpacity,
  ViewPropTypes,
} from 'react-native'
import { images, style, colors } from '../constants'
import { Navigator } from '../navigation'

export const NAV_BAR_BUTTON_ARROW_BACK_WHITE = 'NAV_BAR_BUTTON_ARROW_BACK_WHITE'
export const NAV_BAR_BUTTON_ARROW_BACK_BLACK = 'NAV_BAR_BUTTON_ARROW_BACK_BLACK'
export const NAV_BAR_BUTTON_SHEVRON_DOWN_WHITE =
  'NAV_BAR_BUTTON_SHEVRON_DOWN_WHITE'
export const NAV_BAR_BUTTON_SETTINGS_WHITE = 'NAV_BAR_BUTTON_SETTINGS_WHITE'
export const NAV_BAR_BUTTON_USER_AVATAR = 'NAV_BAR_BUTTON_USER_AVATAR'
export const NAV_BAR_BUTTON_NOTIFICATIONS_WHITE =
  'NAV_BAR_BUTTON_NOTIFICATIONS_WHITE'
export const NAV_BAR_BUTTON_NOTIFICATIONS_BLACK =
  'NAV_BAR_BUTTON_NOTIFICATIONS_BLACK'
export const NAV_BAR_BUTTON_ANDROID_OFFSET = 'NAV_BAR_BUTTON_ANDROID_OFFSET'

class NavBarButton extends Component {
  _renderArrowBack = (isWhite = true) => {
    const { styleWrapper } = this.props
    return (
      <TouchableOpacity
        style={[styles.buttonContainer, styles.backButton, styleWrapper]}
        onPress={this._onPress}
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
    const { styleWrapper } = this.props
    return (
      <TouchableOpacity
        style={[styles.buttonContainer, styles.shevronDownButton, styleWrapper]}
        onPress={this._onPress}
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
    const { styleWrapper } = this.props
    return (
      <TouchableOpacity
        style={[styles.buttonContainer, styles.settingsButton, styleWrapper]}
        onPress={this._onPress}
      >
        <Image
          source={images.NAVBAR_SETTINGS_WHITE}
          resizeMode="contain"
          style={styles.settingsImage}
        />
      </TouchableOpacity>
    )
  }

  _renderUserAvatar = () => {
    const { styleWrapper } = this.props
    return (
      <TouchableOpacity
        style={[styles.buttonContainer, styles.avatarButton, styleWrapper]}
        onPress={this._onPress}
      >
        <Image
          source={images.NAVBAR_AVATAR_EMPTY}
          resizeMode="contain"
          style={styles.avatarImage}
        />
      </TouchableOpacity>
    )
  }

  _renderNotifications = (isWhite = true) => {
    const { notifications, styleWrapper } = this.props
    return (
      <TouchableOpacity
        style={[
          styles.buttonContainer,
          styles.notificationsButton,
          styleWrapper,
        ]}
        onPress={this._onPress}
      >
        <Image
          source={
            isWhite
              ? images.NAVBAR_NOTIFICATIONS_WHITE
              : images.NAVBAR_NOTIFICATIONS_BLACK
          }
          resizeMode="contain"
          style={styles.notificationsImage}
        />
        {!!notifications && (
          <View style={styles.notificationsCircle}>
            <Text style={styles.notificationsText} numberOfLines={1}>
              {notifications}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    )
  }

  _onPress = () => {
    if (this.props.onPress) {
      this.props.onPress()
    } else {
      switch (this.props.type) {
        case NAV_BAR_BUTTON_ARROW_BACK_WHITE:
        case NAV_BAR_BUTTON_ARROW_BACK_BLACK:
          Navigator.pop(this.props.screenId)
          break
        case NAV_BAR_BUTTON_SHEVRON_DOWN_WHITE:
        case NAV_BAR_BUTTON_SETTINGS_WHITE:
        case NAV_BAR_BUTTON_USER_AVATAR:
        case NAV_BAR_BUTTON_ANDROID_OFFSET:
        default:
          break
      }
    }
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
      case NAV_BAR_BUTTON_NOTIFICATIONS_WHITE:
        return this._renderNotifications(true)
      case NAV_BAR_BUTTON_NOTIFICATIONS_BLACK:
        return this._renderNotifications(false)
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
  notificationsButton: {
    width: 32,
    height: 32,
  },
  notificationsImage: {
    width: 19,
    height: 21,
  },
  notificationsCircle: {
    position: 'absolute',
    top: 0,
    right: 4,
    height: 12,
    minWidth: 12,
    maxWidth: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    backgroundColor: colors.BRAND_PINK,
  },
  notificationsText: {
    ...style.text.regular,
    fontSize: 10,
    lineHeight: 12,
    color: colors.WHITE,
  },
})

NavBarButton.propTypes = {
  type: PropTypes.string,
  screenId: PropTypes.string,
  onPress: PropTypes.func,
  androidRightOffset: PropTypes.bool,
  notifications: PropTypes.number,
  styleWrapper: ViewPropTypes.style,
}

NavBarButton.defaultProps = {
  type: '',
  screenId: '',
  androidRightOffset: false,
  notifications: 3,
}

NavBarButton.types = {
  ARROW_BACK_WHITE: NAV_BAR_BUTTON_ARROW_BACK_WHITE,
  ARROW_BACK_BLACK: NAV_BAR_BUTTON_ARROW_BACK_BLACK,
  SHEVRON_DOWN_WHITE: NAV_BAR_BUTTON_SHEVRON_DOWN_WHITE,
  SETTINGS_WHITE: NAV_BAR_BUTTON_SETTINGS_WHITE,
  USER_AVATAR: NAV_BAR_BUTTON_USER_AVATAR,
  NOTIFICATIONS_WHITE: NAV_BAR_BUTTON_NOTIFICATIONS_WHITE,
  NOTIFICATIONS_BLACK: NAV_BAR_BUTTON_NOTIFICATIONS_BLACK,
  ANDROID_OFFSET: NAV_BAR_BUTTON_ANDROID_OFFSET,
}

export default NavBarButton
