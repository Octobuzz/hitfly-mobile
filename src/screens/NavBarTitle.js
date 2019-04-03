import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text } from 'react-native'
import NavBarButton from './NavBarButton'
import { colors, style } from '../constants'

class NavTitle extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/* TODO: фикс для android https://github.com/wix/react-native-navigation/issues/4449 */}
        {this.props.androidLeftButtons.map((item, key) => (
          <NavBarButton
            key={key}
            type={item.type}
            screenId={this.props.screenId}
          />
        ))}
        <Text
          style={[styles.title, { color: this.props.color }]}
          ellipsizeMode="tail"
          numberOfLines={1}
        >
          {this.props.title}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.FUCKING_ANDROID,
  },
  title: {
    ...style.text.navBarTitle,
  },
})

NavTitle.propTypes = {
  title: PropTypes.string,
  androidLeftButtons: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
    }),
  ),
  screenId: PropTypes.string,
  color: PropTypes.string,
}

NavTitle.defaultProps = {
  title: '',
  androidLeftButtons: [],
  screenId: '',
  color: colors.BLACK_LABEL,
}

export default NavTitle
