import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, ViewPropTypes } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Loader from '../components/Loader'
import { colors } from '../constants'

class Wrapper extends Component {
  render() {
    const { children, style, scroll, isFetching } = this.props

    if (scroll) {
      return (
        <Fragment>
          <KeyboardAwareScrollView
            contentContainerStyle={[styles.wrapper, style]}
          >
            {children}
          </KeyboardAwareScrollView>
          {!!isFetching && <Loader styleWrapper={styles.loader} />}
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <View style={[styles.wrapper, style]}>{children}</View>
          {!!isFetching && <Loader styleWrapper={styles.loader} />}
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
})

Wrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  style: ViewPropTypes.style,
  scroll: PropTypes.bool,
  isFetching: PropTypes.bool,
}

Wrapper.defaultProps = {
  scroll: false,
  isFetching: false,
}

export default Wrapper
