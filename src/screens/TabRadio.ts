import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { StyleSheet, View, Text } from 'react-native'

class TabRadio extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Радиостанция</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

TabRadio.propTypes = {}

export default TabRadio
