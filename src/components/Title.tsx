import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ViewPropTypes,
  Image,
} from 'react-native'
import { colors, style, images } from '../constants'
import { hasValue } from '../utils/helpers'

/**
 * Заголовок с описанием и стрелкой
 * @param {object} props
 * @param {object} props.style Стиль для врапера
 * @param {func} props.onPress Функция на нажатие - при отсутсвии компонент перестает быть кликабельным
 * @param {bool} props.disabled Включение/отключение кликабельности
 * @param {string} props.title Текст заголовка
 * @param {string} props.description Текст под заголовком
 * @param {bool} props.noarrow Отключить стрелочку
 * @param {bool} props.hot Показать иконку пламени
 */
const Title = ({
  style,
  onPress,
  disabled,
  title,
  description,
  noarrow,
  hot,
}) => (
  <TouchableOpacity
    style={[styles.wrapper, style && style]}
    onPress={onPress}
    disabled={disabled || !onPress}
    activeOpacity={0.6}
  >
    <View
      style={[
        styles.titleWrapper,
        (hot || !noarrow) && {
          paddingRight: 0 + (hot ? 20 : 0) + (!noarrow ? 30 : 0),
        },
      ]}
    >
      <Text style={styles.headerText} numberOfLines={1}>
        {title}
      </Text>
      {hot && <Image source={images.CONTROL_HOT} style={styles.imageHot} />}
      {!noarrow && (
        <Image
          source={images.CONTROL_RIGHT_ARROW_BLACK}
          style={styles.imageArrow}
        />
      )}
    </View>
    {hasValue(description) && (
      <Text style={styles.descText} numberOfLines={1}>
        {description}
      </Text>
    )}
  </TouchableOpacity>
)

Title.defaultProps = {
  header: '',
  noarrow: false,
  hot: false,
}

const styles = StyleSheet.create({
  wrapper: {},
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageHot: {
    marginBottom: 4,
    marginLeft: 6,
  },
  imageArrow: {
    marginBottom: 2,
    marginLeft: 6,
  },
  headerText: {
    ...style.text.bold,
    fontSize: 20,
    lineHeight: 22,
    color: colors.BLACK_LABEL,
  },
  descText: {
    ...style.text.regular,
    marginTop: 3,
    fontSize: 12,
    lineHeight: 14,
    color: colors.BLACK_LABEL,
  },
})

export default Title
