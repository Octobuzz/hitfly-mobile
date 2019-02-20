import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { StyleSheet, View, Text } from 'react-native'

class TabSearch extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Поиск</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

TabSearch.propTypes = {}

export default TabSearch
