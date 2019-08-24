import React from 'react'
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ViewPropTypes,
} from 'react-native'
import RNLinearGradient from 'react-native-linear-gradient'
import { colors, style, images } from '../constants'

const CategoryItem = props => {
  const {
    label,
    image,
    size,
    styleWrapper,
    styleText,
    onPress,
    selectable,
    selected,
  } = props
  const wrapperStyle = [
    styles.wrapper,
    {
      width: size,
      height: size,
    },
    styleWrapper,
  ]
  const imageStyle = [
    styles.image,
    {
      width: size - (selectable && selected ? 4 : 0),
      height: size - (selectable && selected ? 4 : 0),
      margin: selectable && selected ? 2 : 0,
      borderRadius: selectable && selected ? 3 : 4,
    },
  ]
  const shadowContainerStyle = [
    styles.shadowContainer,
    {
      width: size - (selectable && selected ? 4 : 0),
      height: size - (selectable && selected ? 4 : 0),
      left: selectable && selected ? 2 : 0,
      top: selectable && selected ? 2 : 0,
    },
  ]
  const linearGradientStyle = [
    styles.wrapper,
    {
      width: size,
      height: size,
    },
  ]

  return (
    <TouchableOpacity
      style={wrapperStyle}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.8}
    >
      <RNLinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={[colors.BRAND_BLUE, colors.BRAND_PINK]}
        style={linearGradientStyle}
      >
        <Image style={imageStyle} source={image} resizeMode="cover" />
        <View style={shadowContainerStyle}>
          <Text style={[styles.text, styleText]}>{label}</Text>
        </View>
        {selectable && !selected && (
          <Image
            style={styles.heart}
            source={images.CONTROL_HEART_WHITE}
            resizeMode="contain"
          />
        )}
        {selectable && selected && (
          <Image
            style={styles.heart}
            source={images.CONTROL_HEART_GRADIENT}
            resizeMode="contain"
          />
        )}
      </RNLinearGradient>
    </TouchableOpacity>
  )
}

CategoryItem.defaultProps = {
  label: '',
  size: 100,
  selectable: false,
  selected: false,
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#0ff',
    marginBottom: 10,
    borderRadius: 4,
  },
  shadowContainer: {
    position: 'absolute',
    backgroundColor: colors.BLACK_20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  image: {
    backgroundColor: colors.BLACK,
  },
  heart: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 16,
    height: 16,
  },
  text: {
    ...style.text.bold,
    color: colors.WHITE,
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
    padding: 8,
  },
})

export default CategoryItem
