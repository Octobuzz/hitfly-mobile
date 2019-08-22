import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  Image,
  ViewPropTypes,
  Text,
  TextInput,
  Platform,
  TouchableOpacity,
} from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import { colors, sizes, images, style } from '../constants'

const MASK_PHONE = '+7 ([999]) [999]-[99]-[99]'
const MASK_NUMBERS_5_DOT_2 = '[99990].[99]'
const MASK_NUMBERS_3 = '[099]'
const MASK_NUMBERS_2 = '[00]'

const ICON_CALENDAR = images.FORM_CALENDAR
const ICON_EMAIL = images.FORM_EMAIL
const ICON_PASSWORD = images.FORM_PASSWORD
const ICON_SEARCH = images.FORM_SEARCH
const ICON_SHEVRON_DOWN = images.FORM_SHEVRON_DOWN

const InputText = props => {
  let InputContainer = TextInput
  const {
    value,
    styleWrapper,
    styleInput,
    placeholder,
    rightIcon,
    rightIconOnPress,
    buttonMode,
    onPress,
    warning,
    warningText,
  } = props

  let inputOffsets = {
    ...Platform.select({
      ios: props.multiline
        ? {
            height: sizes.INPUT_HEIGHT,
            paddingTop: value ? 18 : 16,
          }
        : {
            paddingTop: value ? 6 : 0,
            minHeight: sizes.INPUT_HEIGHT,
          },
      android: props.multiline
        ? {
            height: sizes.INPUT_HEIGHT,
            textAlignVertical: 'top',
            paddingTop: value ? 20 : 16,
          }
        : {
            minHeight: sizes.INPUT_HEIGHT,
            paddingTop: value ? 12 : 0,
            textAlignVertical: 'center',
          },
    }),
    paddingRight: rightIcon ? 8 + sizes.INPUT_HEIGHT : 16,
  }

  let inputProps = {
    ...props,
    secureTextEntry: props.secureTextEntry || props.password,
    placeholder: '',
    placeholderTextColor: colors.EXTRA_GRAY_LABEL,
    style: [
      styles.input,
      warning && styles.inputWarning,
      styleInput,
      inputOffsets,
    ],
    underlineColorAndroid: 'transparent',
    selectionColor: colors.EXTRA_GRAY_LABEL,
  }

  if (props.mask) {
    InputContainer = TextInputMask
    inputProps = {
      ...inputProps,
      mask: props.mask,
    }
    switch (props.mask) {
      case MASK_PHONE:
        inputProps = {
          ...inputProps,
          keyboardType: 'phone-pad',
          maxLength: 18,
        }
        break
      case MASK_NUMBERS_5_DOT_2:
        inputProps = {
          ...inputProps,
          keyboardType: 'numeric',
          maxLength: 8,
        }
        break
      case MASK_NUMBERS_3:
        inputProps = {
          ...inputProps,
          keyboardType: 'numeric',
          maxLength: 3,
        }
        break
      case MASK_NUMBERS_2:
        inputProps = {
          ...inputProps,
          keyboardType: 'numeric',
          maxLength: 2,
        }
        break
      default:
        break
    }
  }

  return (
    <View style={[styles.wrapper, styleWrapper]}>
      <View>
        {!!placeholder && (
          <Text
            style={value ? styles.placeholderDirty : styles.placeholderEmpty}
            numberOfLines={1}
          >
            {placeholder}
          </Text>
        )}
        {!!rightIcon && !rightIconOnPress && (
          <View style={styles.rightIconContainer}>
            <Image source={rightIcon} resizeMode="contain" />
          </View>
        )}
        {buttonMode ? (
          <TouchableOpacity
            style={[
              styles.input,
              warning && styles.inputWarning,
              styleInput,
              inputOffsets,
            ]}
            onPress={onPress}
          >
            <Text style={styles.inputButtonned} numberOfLines={1}>
              {props.value}
            </Text>
          </TouchableOpacity>
        ) : (
          <InputContainer {...inputProps} />
        )}
        {!!rightIcon && !!rightIconOnPress && (
          <TouchableOpacity
            style={styles.rightIconContainer}
            activeOpacity={0.5}
            onPress={rightIconOnPress}
          >
            <Image source={rightIcon} resizeMode="contain" />
          </TouchableOpacity>
        )}
      </View>
      {!!warning && !!warningText && (
        <Text style={styles.warningText}>{warningText}</Text>
      )}
    </View>
  )
}

InputText.masks = {
  MASK_PHONE,
  MASK_NUMBERS_5_DOT_2,
  MASK_NUMBERS_3,
  MASK_NUMBERS_2,
}

InputText.icons = {
  ICON_CALENDAR,
  ICON_EMAIL,
  ICON_PASSWORD,
  ICON_SEARCH,
  ICON_SHEVRON_DOWN,
}

InputText.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  password: PropTypes.bool,
  mask: PropTypes.string,
  styleWrapper: ViewPropTypes.style,
  styleInput: ViewPropTypes.style,
  rightIcon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  rightIconOnPress: PropTypes.func,
  buttonMode: PropTypes.bool,
  onPress: PropTypes.func,
  warning: PropTypes.bool,
  warningText: PropTypes.string,
}

InputText.defaultProps = {
  value: '',
  placeholder: '',
  password: false,
  buttonMode: false,
  warning: false,
  warningText: '',
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: sizes.INPUT_HEIGHT,
    backgroundColor: colors.INPUT_BACKGROUND,
  },
  input: {
    position: 'absolute',
    width: '100%',
    ...style.text.regular,
    color: colors.BLACK_LABEL,
    fontSize: 16,
    lineHeight: 18,
    backgroundColor: colors.TRANSPARENT,
    paddingHorizontal: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.INPUT_BORDER,
  },
  inputButtonned: {
    ...style.text.regular,
    color: colors.BLACK_LABEL,
    fontSize: 16,
    lineHeight: 18,
    ...Platform.select({
      ios: {
        paddingTop: 14,
      },
      android: {
        paddingTop: 8,
      },
    }),
  },
  inputWarning: {
    borderColor: colors.INPUT_WARNING,
  },
  placeholderDirty: {
    position: 'absolute',
    left: 1,
    top: 1,
    ...style.text.regular,
    color: colors.BLACK_LABEL,
    fontSize: 10,
    lineHeight: 10,
    paddingTop: 10,
    paddingLeft: 16,
    paddingRight: sizes.INPUT_HEIGHT + 8,
  },
  placeholderEmpty: {
    position: 'absolute',
    left: 1,
    top: 1,
    ...style.text.regular,
    color: colors.EXTRA_GRAY_LABEL,
    fontSize: 16,
    lineHeight: 18,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: sizes.INPUT_HEIGHT + 8,
  },
  rightIconContainer: {
    position: 'absolute',
    right: 8,
    top: 0,
    width: sizes.INPUT_HEIGHT,
    height: sizes.INPUT_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  warningText: {
    ...style.text.regular,
    color: colors.INPUT_WARNING,
    fontSize: 12,
    lineHeight: 12,
    paddingVertical: 4,
  },
})

export default InputText
