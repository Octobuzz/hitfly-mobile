import R from 'ramda'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import Navigator from '../navigation/Navigator'
import { profileSelectors, requestLogIn } from '../redux/profile'

class Login extends Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.userName && this.props.userName) {
      Navigator.startTabBasedApp()
    }
  }

  _onPressLogin = () => {
    this.props.requestLogIn('Some User Name')
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this._onPressLogin}>
          <Text>Войти</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

Login.propTypes = {
  requestLogIn: PropTypes.func,
  userName: PropTypes.string,
  isFetching: PropTypes.bool,
}

const mapStateToProps = R.applySpec({
  userName: profileSelectors.getUserName,
  isFetching: profileSelectors.getIsFetching,
})

const mapDispatchToProps = {
  requestLogIn,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login)
