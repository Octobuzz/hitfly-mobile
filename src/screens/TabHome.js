import R from 'ramda'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import Navigator from '../navigation/Navigator'
import { profileSelectors, requestLogOut } from '../redux/profile'
// import style from '../style'

class TabHome extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.userName && !this.props.userName) {
      Navigator.startLoginScreen()
    }
  }

  _onPressLogOut = () => {
    this.props.requestLogOut()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Главное</Text>
        <TouchableOpacity onPress={this._onPressLogOut}>
          <Text>Выйти</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

TabHome.propTypes = {
  requestLogOut: PropTypes.func,
  userName: PropTypes.string,
  isFetching: PropTypes.bool,
}

const mapStateToProps = R.applySpec({
  userName: profileSelectors.getUserName,
  isFetching: profileSelectors.getIsFetching,
})

const mapDispatchToProps = {
  requestLogOut,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TabHome)
