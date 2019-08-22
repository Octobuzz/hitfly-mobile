import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, ViewPropTypes } from 'react-native'
import { Bars } from 'react-native-loader'
import { colors } from '../constants'

const Loader = props => {
  const { styleWrapper, size, color } = props

  return (
    <View style={[styles.wrapper, styleWrapper]}>
      <Bars size={size} color={color} />
    </View>
  )
}

Loader.propTypes = {
  styleWrapper: ViewPropTypes.style,
  size: PropTypes.number,
  color: PropTypes.string,
}

Loader.defaultProps = {
  size: 20,
  color: colors.BRAND_BLUE,
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Loader
