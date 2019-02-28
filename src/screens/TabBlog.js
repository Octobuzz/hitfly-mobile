import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { StyleSheet, View, Text } from 'react-native'

class TabBlog extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Блог</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

TabBlog.propTypes = {}

export default TabBlog