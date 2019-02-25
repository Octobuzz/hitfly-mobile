import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text } from 'react-native'
import { colors } from '../constants'
import style from '../style'

class NavTitle extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>
          {this.props.title}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    ...style.text.navBarTitle,
    color: colors.BLACK_LABEL,
  },
})

NavTitle.propTypes = {
  title: PropTypes.string,
}

NavTitle.defaultProps = {
  title: '',
}

export default NavTitle
