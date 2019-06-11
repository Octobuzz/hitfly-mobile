import React from 'react'
import PropTypes from 'prop-types'
import { View, Platform, StyleSheet, ViewPropTypes } from 'react-native'
import { ifIphoneX, getStatusBarHeight } from 'react-native-iphone-x-helper'
import NavBarButton from './NavBarButton'
import { colors } from '../constants'

/**
 * Заголовок с описанием и стрелкой
 * @param {object} props
 * @param {object} props.styleWrapper Стиль для врапера
 * @param {func} props.leftButtons Массив левых кнопок
 * @param {func} props.leftButtons.type тип кнопки
 * @param {func} props.leftButtons.onPress Событие нажатия
 * @param {func} props.rightButtons Массив правых кнопок
 * @param {func} props.rightButtons.type тип кнопки
 * @param {func} props.rightButtons.onPress Событие нажатия
 * @param {bool} props.centerSpaceProps Пропсы пространства между кнопками
 */

const NavBar = ({
  styleWrapper,
  leftButtons,
  rightButtons,
  centerSpaceProps,
}) => (
  <View style={[styles.wrapper, styleWrapper]}>
    <View style={styles.buttonsContainer}>
      {leftButtons.map((buttonProps, index) => (
        <NavBarButton
          key={index}
          styleWrapper={styles.leftButton}
          {...buttonProps}
        />
      ))}
    </View>
    <View style={styles.navbarCenterSpace} {...centerSpaceProps} />
    <View style={styles.buttonsContainer}>
      {rightButtons.map((buttonProps, index) => (
        <NavBarButton
          key={index}
          styleWrapper={styles.rightButton}
          {...buttonProps}
        />
      ))}
    </View>
  </View>
)

NavBar.propTypes = {
  styleWrapper: ViewPropTypes.style,
  leftButtons: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      onPress: PropTypes.func,
    }),
  ),
  rightButtons: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      onPress: PropTypes.func,
    }),
  ),
  centerSpaceProps: PropTypes.object,
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    ...Platform.select({
      ios: {
        ...ifIphoneX(
          {
            paddingTop: getStatusBarHeight() + 24,
          },
          {
            paddingTop: 24,
          },
        ),
      },
      android: {
        paddingTop: 16,
      },
    }),
  },
  navbarCenterSpace: {
    flex: 1,
    backgroundColor: colors.FUCKING_ANDROID,
    ...Platform.select({
      ios: {
        ...ifIphoneX(
          {
            marginTop: -(getStatusBarHeight() + 24),
          },
          {
            marginTop: -24,
          },
        ),
      },
      android: {
        marginTop: -16,
      },
    }),
  },
  buttonsContainer: {
    flexDirection: 'row',
    minHeight: 36,
  },
  leftButton: {
    marginRight: 8,
  },
  rightButton: {
    marginLeft: 8,
  },
})

export default NavBar
