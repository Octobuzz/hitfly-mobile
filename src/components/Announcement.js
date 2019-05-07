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
import RNFastImage from 'react-native-fast-image'
import RNLinearGradient from 'react-native-linear-gradient'
import { colors, style } from '../constants'
import { hasValue } from '../utils/helpers'

const HEIGHT_IMG = 210
const HEIGHT_BG = 160

const BG = (bgcolors, bgimage) => {
  let backgroundColor = colors.BRAND_BLUE
  let content = null
  if (bgimage) {
    content =
      typeof bgimage === 'string' ? (
        <RNFastImage source={{ uri: bgimage }} style={styles.bgImage} />
      ) : (
        <Image source={bgimage} style={styles.bgimage} />
      )
  }
  if (bgcolors && Array.isArray(bgcolors)) {
    if (bgcolors.length > 1)
      return (
        <RNLinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={bgcolors}
          style={styles.background}
        >
          {content}
        </RNLinearGradient>
      )
    else if (bgcolors.length > 0) backgroundColor = bgcolors[0]
  }
  return <View style={[styles.background, { backgroundColor }]}>{content}</View>
}

/**
 * Компонент блок аннонса
 * @param {object} props
 * @param {object} props.style Стиль для врапера
 * @param {func} props.onPress Функция на нажатие - при отсутсвии компонент перестает быть кликабельным
 * @param {bool} props.disabled Включение/отключение кликабельности
 * @param {string} props.title Текст заголовка
 * @param {string} props.description Текст под заголовком
 * @param {string} props.bottom Текст внизу контейнера
 * @param {array} props.bgcolors Массив цветов
 * @param {*} props.bgimage Картинка на подложку вложенную или {uri: 'link'}
 * @param {*} props.image Ссылка на картинку вложенную или {uri: 'link'}
 * @param {*} props.imageSize TODO: размеры картинки
 */
const Announcement = ({
  styleWrapper,
  onPress,
  disabled,
  title,
  description,
  bottom,
  bgcolors,
  bgimage,
  image,
  imageSize,
}) => (
  <TouchableOpacity
    style={[
      hasValue(image) ? styles.wrapper : styles.wrapper2,
      styleWrapper && styleWrapper,
    ]}
    onPress={onPress}
    disabled={disabled || !onPress}
    activeOpacity={0.6}
  >
    <View style={styles.content}>
      {BG(bgcolors, bgimage)}
      {hasValue(image) && (
        <View
          style={[
            styles.imageWrapper,
            hasValue(imageSize) &&
              imageSize.width &&
              imageSize.height && {
                width: imageSize.width,
                height: imageSize.height,
              },
          ]}
        >
          {typeof image === 'string' ? (
            <RNFastImage
              source={{ uri: image }}
              style={styles.image}
              resizeMode="contain"
            />
          ) : (
            <Image source={image} style={styles.image} resizeMode="contain" />
          )}
        </View>
      )}
      <View style={styles.flexWrapper}>
        <View style={styles.textsWrapper}>
          <View>
            <Text style={styles.headerText} numberOfLines={2}>
              {title}
            </Text>
            {hasValue(description) && (
              <Text style={styles.descText} numberOfLines={2}>
                {description}
              </Text>
            )}
          </View>
          {hasValue(bottom) && (
            <Text style={styles.descText} numberOfLines={1}>
              {bottom}
            </Text>
          )}
        </View>
        {hasValue(image) && (
          <View
            style={[
              styles.right,
              hasValue(imageSize) &&
                imageSize.width && {
                  width: imageSize.width,
                },
            ]}
          />
        )}
      </View>
    </View>
  </TouchableOpacity>
)

Announcement.propTypes = {
  styleWrapper: ViewPropTypes.style,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  bottom: PropTypes.string,
  bgcolors: PropTypes.arrayOf(PropTypes.string).isRequired,
  bgimage: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.object,
  ]),
  image: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.object,
  ]),
  imageSize: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }),
}

Announcement.defaultProps = {
  title: '',
  bgcolors: [colors.BRAND_PINK, colors.BRAND_BLUE],
}

const styles = StyleSheet.create({
  wrapper: {
    height: HEIGHT_IMG,
  },
  wrapper2: {
    height: HEIGHT_BG,
  },
  content: {
    flex: 2,
    justifyContent: 'flex-end',
  },
  background: {
    backgroundColor: 'red',
    height: HEIGHT_BG,
    borderRadius: 4,
    overflow: 'hidden',
  },
  imageWrapper: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: HEIGHT_IMG,
    maxWidth: HEIGHT_IMG,
  },
  image: {
    flex: 1,
  },
  flexWrapper: {
    position: 'absolute',
    flex: 3,
    flexDirection: 'row',
  },
  right: {
    // flex: 1,
  },
  textsWrapper: {
    flex: 2,
    padding: 16,
    paddingVertical: 14,
    height: HEIGHT_BG,
    justifyContent: 'space-between',
  },
  headerText: {
    ...style.text.bold,
    fontSize: 20,
    lineHeight: 22,
    color: colors.WHITE,
  },
  descText: {
    ...style.text.regular,
    marginTop: 6,
    fontSize: 12,
    lineHeight: 14,
    color: colors.WHITE,
  },
  bgImage: {
    alignSelf: 'center',
  },
})

export default Announcement
