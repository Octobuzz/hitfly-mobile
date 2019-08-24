import React, { Component } from 'react'
import { StyleSheet, ViewPropTypes } from 'react-native'
import Swiper from 'react-native-swiper'
import { colors } from '../constants'

const CustomSwiper = props => {
  const {
    loop,
    styleWrapper,
    stylePagination,
    styleDot,
    styleDotActive,
    width,
    height,
    children,
    onTouchStart,
    onTouchEnd,
    onIndexChanged,
  } = props
  const swiperStyle = {
    ...styles.wrapper,
    ...styleWrapper,
  }
  const paginationStyle = {
    ...styles.pagination,
    ...stylePagination,
  }
  const dotStyle = {
    ...styles.dot,
    ...styleDot,
  }
  const dotActiveStyle = {
    ...styles.activeDot,
    ...styleDotActive,
  }
  return (
    <Swiper
      index={0}
      loop={loop}
      style={swiperStyle}
      showsButtons={false}
      showsPagination
      paginationStyle={paginationStyle}
      dotStyle={dotStyle}
      activeDotStyle={dotActiveStyle}
      width={width}
      height={height}
      onTouchStart={() => {
        onTouchStart && onTouchStart()
      }}
      onTouchEnd={() => {
        onTouchEnd && onTouchEnd()
      }}
      onIndexChanged={onIndexChanged}
    >
      {!!children && children}
    </Swiper>
  )
}

class CustomSwiperWithoutUpdate extends Component {
  shouldComponentUpdate(nextProps) {
    return false
  }

  render() {
    return <CustomSwiper {...this.props} />
  }
}

const styles = StyleSheet.create({
  wrapper: {},
  pagination: {
    bottom: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.BLUE,
    backgroundColor: colors.WHITE,
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.BLUE,
    backgroundColor: colors.BLUE,
  },
})

export const CustomSwiperForseUpdation = CustomSwiperWithoutUpdate
export default CustomSwiper
