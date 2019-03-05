import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ViewPropTypes,
} from 'react-native'
import { colors, style } from '../constants'
import { hasValue } from '../utils/helpers'

/**
 * Квадратная иконка с закругленными краями и две надписи
 * @param {object} props
 * @param {string} props.title Заголовок
 * @param {string} props.description Описание
 * @param {*} props.image Ссылка на картинку вложенную или {uri: 'link'}
 * @param {number} props.size Размер блока (ширина)
 * @param {object} props.style Стиль для врапера
 * @param {func} props.onPress Функция на нажатие - при отсутсвии компонент перестает быть кликабельным
 */
const GenreItem = ({ title, description, image, size, style, onPress }) => {
  const wrapperStyle = [
    styles.wrapper,
    {
      width: size,
    },
    style,
  ]
  const imageWrapperStyle = [
    styles.imageWrapper,
    {
      width: size,
    },
  ]
  const imageStyle = [
    styles.imageWrapper,
    {
      width: size,
      height: size,
      borderRadius: 4,
    },
  ]
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.8}
      style={wrapperStyle}
    >
      {hasValue(image) && (
        <View style={imageWrapperStyle}>
          <Image style={imageStyle} source={image} resizeMode="cover" />
        </View>
      )}
      {(hasValue(title) || hasValue(description)) && (
        <View style={styles.bottomWrapper}>
          {hasValue(title) && (
            <Text numberOfLines={2} style={styles.title}>
              {title}
            </Text>
          )}
          {hasValue(description) && (
            <Text numberOfLines={1} style={styles.description}>
              {description}
            </Text>
          )}
        </View>
      )}
    </TouchableOpacity>
  )
}

GenreItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  size: PropTypes.number.isRequired,
  style: ViewPropTypes.style,
  onPress: PropTypes.func,
}

GenreItem.defaultProps = {
  size: 100,
}

const styles = StyleSheet.create({
  wrapper: {},
  imageWrapper: {
    overflow: 'hidden',
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  image: {},
  bottomWrapper: {
    paddingTop: 6,
  },
  title: {
    ...style.text.medium,
    color: colors.BLACK_LABEL,
    fontSize: 14,
    lineHeight: 16,
    paddingTop: 2,
  },
  description: {
    ...style.text.regular,
    color: colors.BLACK_LABEL,
    fontSize: 12,
    lineHeight: 14,
    paddingTop: 4,
  },
})

export default GenreItem
