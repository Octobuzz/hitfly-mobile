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
import RNFastImage from 'react-native-fast-image'
import { colors, style } from '../constants'
import { hasValue } from '../utils/helpers'

const ITEM_HEIGHT = 56

/**
 * Трек в плейлисте
 * @param {object} props
 * @param {string} props.title Заголовок
 * @param {string} props.description Описание
 * @param {string} props.time время трека
 * @param {*} props.image Ссылка на картинку, requireID или объект картинки
 * @param {number} props.time Продолжительность трека в секундах
 * @param {func} props.onPress Функция play/pause
 * @param {func} props.controls Дополнительные кнопки
 */

const PlaylistItem = ({
  title,
  description,
  time,
  image,
  style,
  onPress,
  controls,
}) => {
  const wrapperStyle = [styles.wrapper, style]
  return (
    <View style={wrapperStyle}>
      <TouchableOpacity
        onPress={onPress}
        disabled={!onPress}
        activeOpacity={0.8}
        style={styles.trackInfo}
      >
        <View style={styles.artworkWrapper}>
          {typeof image === 'string' ? (
            <RNFastImage
              style={styles.artwork}
              source={{ uri: image }}
              resizeMode="cover"
            />
          ) : (
            <Image style={styles.artwork} source={image} resizeMode="cover" />
          )}
        </View>
        <View style={styles.textWrapper}>
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
          <Text numberOfLines={1} style={styles.description}>
            {description}
          </Text>
        </View>
      </TouchableOpacity>
      {hasValue(controls) && controls}
      {hasValue(time) && (
        <Text numberOfLines={1} style={styles.time}>
          {time}
        </Text>
      )}
    </View>
  )
}

PlaylistItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  time: PropTypes.string,
  image: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.string,
  ]),
  onPress: PropTypes.func,
  style: ViewPropTypes.style,
  controls: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

const styles = StyleSheet.create({
  wrapper: {
    height: ITEM_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 16,
  },
  trackInfo: {
    height: ITEM_HEIGHT,
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignContent: 'center',
    flexGrow: 1,
    width: 0,
  },
  artworkWrapper: {
    width: 32,
    height: ITEM_HEIGHT,
    alignContent: 'center',
    justifyContent: 'center',
  },
  artwork: {
    borderRadius: 4,
    width: 32,
    height: 32,
  },
  bottomWrapper: {
    paddingTop: 16,
  },
  textWrapper: {
    paddingLeft: 16,
    justifyContent: 'center',
  },
  title: {
    ...style.text.medium,
    color: colors.BLACK_LABEL,
    fontSize: 12,
    lineHeight: 14,
    paddingTop: 2,
  },
  description: {
    ...style.text.regular,
    color: colors.GRAY_LABEL,
    fontSize: 10,
    lineHeight: 12,
    paddingTop: 2,
  },
  time: {
    ...style.text.regular,
    color: colors.GRAY_LABEL,
    fontSize: 10,
    lineHeight: 12,
    textAlign: 'right',
    minWidth: 32,
    paddingLeft: 8,
  },
})

export default PlaylistItem
