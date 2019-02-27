import R from 'ramda'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { StyleSheet } from 'react-native'
import { Navigator } from '../navigation'
import { profileSelectors, requestLogOut } from '../redux/profile'
import Button from '../components/Button'
import Wrapper from '../containers/Wrapper'

class TabHome extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.userName && !this.props.userName) {
      Navigator.startAuthScreen()
    }
  }

  _onPressLogOut = () => {
    this.props.requestLogOut()
  }

  render() {
    return (
      <Wrapper isFetching={this.props.isFetching}>
        <Button
          label="Выйти"
          styleWrapper={styles.roundedButtonWrapper}
          onPress={this._onPressLogOut}
        />
      </Wrapper>
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
