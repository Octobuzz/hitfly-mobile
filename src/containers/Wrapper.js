import R from 'ramda'
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, ScrollView, ViewPropTypes } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Loader from '../components/Loader'
import { colors, sizes } from '../constants'

class Wrapper extends Component {
  render() {
    const {
      children,
      style,
      scroll,
      scrollKeyboard,
      playerOffset,
      isFetching,
    } = this.props

    if (scroll || scrollKeyboard) {
      const ScrollContainer = scrollKeyboard
        ? KeyboardAwareScrollView
        : ScrollView
      const scrollViewProps = R.omit(
        ['children', 'style', 'scroll', 'scrollKeyboard', 'isFetching'],
        this.props,
      )
      return (
        <Fragment>
          <ScrollContainer
            contentContainerStyle={[styles.wrapper, style]}
            {...scrollViewProps}
          >
            {children}
          </ScrollContainer>
          {!!isFetching && <Loader styleWrapper={styles.loader} />}
          {!!playerOffset && <View style={styles.playerOffset} />}
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <View style={[styles.wrapper, styles.flexWrapper, style]}>
            {children}
          </View>
          {!!isFetching && <Loader styleWrapper={styles.loader} />}
          {!!playerOffset && <View style={styles.playerOffset} />}
        </Fragment>
      )
    }
  }
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  flexWrapper: {
    flex: 1,
  },
  loader: {
    backgroundColor: colors.WHITE_60,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerOffset: {
    height: sizes.MIN_PLAYER_HEIGHT,
  },
})

Wrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  style: ViewPropTypes.style,
  scroll: PropTypes.bool,
  scrollKeyboard: PropTypes.bool,
  playerOffset: PropTypes.bool,
  isFetching: PropTypes.bool,
}

Wrapper.defaultProps = {
  scroll: false,
  scrollKeyboard: false,
  playerOffset: false,
  isFetching: false,
}

export default Wrapper
