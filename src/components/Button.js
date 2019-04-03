import React from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ViewPropTypes,
  Image,
} from 'react-native'
import RNLinearGradient from 'react-native-linear-gradient'
import { colors, sizes, style } from '../constants/'

const BUTTON_DEFAULT = 'BUTTON_DEFAULT'
const BUTTON_HEADER = 'BUTTON_HEADER'
const BUTTON_BORDERED = 'BUTTON_BORDERED'
const BUTTON_ICON = 'BUTTON_ICON'
const BUTTON_LINK = 'BUTTON_LINK'

const Button = props => {
  const {
    label,
    numberOfLabelLines,
    type: _type,
    icon,
    onPress,
    styleWrapper,
    styleTouchable,
    styleContent,
    styleIconContainer,
    styleIconImage,
    styleLabel,
    children,
  } = props
  const disabled = props.disabled || !onPress
  const type = _type && [_type] && styles[_type] ? _type : BUTTON_DEFAULT
  const wrapperStyle = [
    styles[type].wrapper,
    disabled ? { opacity: 0.4 } : { opacity: 1 },
    styleWrapper,
  ]
  const touchableStyle = [styles[type].touchable, styleTouchable]
  const contentStyle = [styles[type].content, styleContent]
  const iconContainerStyle = [styles[type].iconContainer, styleIconContainer]
  const iconStyle = [styles[type].iconImage, styleIconImage]
  const labelStyle = [styles[type].label, styleLabel]
  const linearGradientStyle = styles[type].linearGradient
  const ButtonContent = (
    <View style={contentStyle}>
      {!!children && children}
      {!!icon && (
        <View style={iconContainerStyle}>
          {<Image style={iconStyle} source={icon} resizeMode="contain" />}
        </View>
      )}
      {!!label && (
        <Text style={labelStyle} numberOfLines={numberOfLabelLines}>
          {label}
        </Text>
      )}
    </View>
  )
  return (
    <View style={wrapperStyle}>
      <TouchableOpacity
        style={touchableStyle}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.8}
      >
        {type === BUTTON_LINK || type === BUTTON_ICON ? (
          ButtonContent
        ) : (
          <RNLinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={[colors.BRAND_BLUE, colors.BRAND_PINK]}
            style={linearGradientStyle}
          >
            {ButtonContent}
          </RNLinearGradient>
        )}
      </TouchableOpacity>
    </View>
  )
}

Button.types = {
  BUTTON_DEFAULT,
  BUTTON_HEADER,
  BUTTON_BORDERED,
  BUTTON_ICON,
  BUTTON_LINK,
}

Button.propTypes = {
  icon: PropTypes.number,
  label: PropTypes.string.isRequired,
  numberOfLabelLines: PropTypes.number,
  subLabel: PropTypes.string,
  type: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  styleTouchable: ViewPropTypes.style,
  styleWrapper: ViewPropTypes.style,
  styleContent: ViewPropTypes.style,
  styleIconContainer: ViewPropTypes.style,
  styleIconImage: ViewPropTypes.style,
  styleLabel: Text.propTypes.style,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

Button.defaultProps = {
  label: '',
  numberOfLabelLines: 1,
  type: BUTTON_DEFAULT,
}

const base_styles = {
  wrapper: {
    alignItems: 'center',
  },
  touchable: {
    width: '100%',
    maxWidth: sizes.BUTTON_MAX_WIDTH,
    height: sizes.BUTTON_HEIGHT,
  },
  linearGradient: {
    width: '100%',
    height: '100%',
  },
  content: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImage: {
    flex: 1,
  },
  label: {
    ...style.text.regular,
    fontSize: 16,
    lineHeight: 18,
    textAlign: 'center',
    color: colors.WHITE,
  },
}

const styles = {
  [BUTTON_DEFAULT]: StyleSheet.create({
    ...base_styles,
    wrapper: {
      ...base_styles.wrapper,
      width: '100%',
    },
    touchable: {
      ...base_styles.touchable,
      borderRadius: sizes.BUTTON_HEIGHT / 2,
    },
    linearGradient: {
      ...base_styles.linearGradient,
      borderRadius: sizes.BUTTON_HEIGHT / 2,
    },
  }),
  [BUTTON_HEADER]: StyleSheet.create({
    ...base_styles,
    wrapper: {
      ...base_styles.wrapper,
      width: '100%',
      alignItems: 'flex-end',
    },
    touchable: {
      ...base_styles.touchable,
      maxWidth: sizes.WINDOW_WIDTH * 0.85,
      borderTopLeftRadius: sizes.BUTTON_HEIGHT / 2,
    },
    linearGradient: {
      ...base_styles.linearGradient,
      borderTopLeftRadius: sizes.BUTTON_HEIGHT / 2,
    },
  }),
  [BUTTON_BORDERED]: StyleSheet.create({
    ...base_styles,
    wrapper: {
      ...base_styles.wrapper,
      width: '100%',
    },
    touchable: {
      ...base_styles.touchable,
      borderRadius: sizes.BUTTON_HEIGHT / 2,
    },
    linearGradient: {
      ...base_styles.linearGradient,
      borderRadius: sizes.BUTTON_HEIGHT / 2,
      padding: 1,
    },
    content: {
      ...base_styles.content,
      flex: 1,
      borderRadius: (sizes.BUTTON_HEIGHT - 2) / 2,
      backgroundColor: colors.WHITE,
    },
    label: {
      ...base_styles.label,
      color: colors.BLACK_LABEL,
    },
  }),
  [BUTTON_ICON]: StyleSheet.create({
    ...base_styles,
    touchable: {
      ...base_styles.touchable,
    },
  }),
  [BUTTON_LINK]: StyleSheet.create({
    ...base_styles,
    touchable: {
      ...base_styles.touchable,
      maxWidth: '100%',
      backgroundColor: colors.TRANSPARENT,
      paddingHorizontal: sizes.BUTTON_HEIGHT / 2,
    },
    label: {
      ...base_styles.label,
      color: colors.BRAND_PINK,
    },
  }),
}

export default Button
