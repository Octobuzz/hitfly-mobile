import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Image, TouchableOpacity } from 'react-native'
import { images, colors } from '../constants'

export const NAV_BAR_BUTTON_ARROW_BACK_WHITE = 'NAV_BAR_BUTTON_ARROW_BACK_WHITE'
export const NAV_BAR_BUTTON_ARROW_BACK_BLACK = 'NAV_BAR_BUTTON_ARROW_BACK_BLACK'
export const NAV_BAR_BUTTON_SHEVRON_DOWN_WHITE =
  'NAV_BAR_BUTTON_SHEVRON_DOWN_WHITE'
export const NAV_BAR_BUTTON_SETTINGS_WHITE = 'NAV_BAR_BUTTON_SETTINGS_WHITE'
export const NAV_BAR_BUTTON_USER_AVATAR = 'NAV_BAR_BUTTON_USER_AVATAR'

class NavBarButton extends Component {
  _renderArrowBack = (isWhite = true) => {
    return (
      <TouchableOpacity style={styles.backButton}>
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
      <TouchableOpacity style={styles.shevronDownButton}>
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
      <TouchableOpacity style={styles.settingsButton}>
        <Image
          source={images.NAVBAR_SETTINGS_WHITE}
          resizeMode="contain"
          style={styles.settingsImage}
        />
      </TouchableOpacity>
    )
  }

  _renderUserAvater = () => {
    return (
      <TouchableOpacity style={styles.avatarButton}>
        <Image
          source={images.NAVBAR_AVATAR_EMPTY}
          resizeMode="contain"
          style={styles.avatarImage}
        />
      </TouchableOpacity>
    )
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
        return this._renderUserAvater()

      default:
        return null
    }
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#0f0',
  },
  backButton: {},
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
}

NavBarButton.defaultProps = {
  type: 'sometype',
}
export default NavBarButton
