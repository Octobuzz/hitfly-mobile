import React from 'react'
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ViewPropTypes,
} from 'react-native'
import RNFastImage from 'react-native-fast-image'
import { colors, style, images } from '../constants'
import { hasValue } from '../utils/helpers'

const ITEM_HEIGHT = 56

/**
 * Трек
 * @param {object} props
 * @param {bool} props.blackMode темный режим
 * @param {string} props.label Заголовок
 * @param {string} props.description Описание
 * @param {string} props.time время трека
 * @param {*} props.image Ссылка на картинку, requireID или объект картинки
 * @param {number} props.time Продолжительность трека в секундах
 * @param {func} props.onPress Функция play/pause
 * @param {func} props.controls Дополнительные кнопки
 * @param {bool} props.isPlayed трек играется
 * @param {bool} props.isPaused трек на паузе
 */

const TrackItem = ({
  blackMode = false,
  label,
  description,
  time,
  image,
  style,
  onPress,
  controls,
  isPlayed,
  isPaused,
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
          {typeof image === 'string' && !isPaused && !isPlayed ? (
            <RNFastImage
              style={styles.artwork}
              source={{ uri: image }}
              resizeMode="cover"
            />
          ) : (
            <Image
              style={styles.artwork}
              source={
                isPlayed
                  ? images.CONTROL_TRACK_PAUSE
                  : isPaused
                  ? images.CONTROL_TRACK_PLAY
                  : image
              }
              resizeMode="cover"
            />
          )}
        </View>
        <View style={styles.textWrapper}>
          <Text
            numberOfLines={1}
            style={[styles.label, blackMode && styles.labelWhite]}
          >
            {label}
          </Text>
          <Text
            numberOfLines={1}
            style={[styles.description, blackMode && styles.descriptionWhite]}
          >
            {description}
          </Text>
        </View>
      </TouchableOpacity>
      {hasValue(controls)
        ? Array.isArray(controls)
          ? controls.map(item => item)
          : controls
        : null}
      {hasValue(time) && (
        <Text
          numberOfLines={1}
          style={[styles.time, blackMode && styles.timeWhite]}
        >
          {time}
        </Text>
      )}
    </View>
  )
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
    paddingRight: 8,
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
    flexGrow: 1,
    width: 0,
  },
  label: {
    ...style.text.medium,
    color: colors.BLACK_LABEL,
    fontSize: 12,
    lineHeight: 14,
    paddingTop: 2,
  },
  labelWhite: {
    color: colors.WHITE,
  },
  description: {
    ...style.text.regular,
    color: colors.GRAY_LABEL,
    fontSize: 10,
    lineHeight: 12,
    paddingTop: 2,
  },
  descriptionWhite: {
    color: colors.WHITE_60,
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
  timeWhite: {
    color: colors.WHITE_60,
  },
})

export default TrackItem
