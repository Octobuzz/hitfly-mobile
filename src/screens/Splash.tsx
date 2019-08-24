import R from 'ramda'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Image, Platform } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { colors, images } from '../constants'
import { profileSelectors } from '../redux/profile'

class Splash extends Component {
  componentDidMount() {
    if (Platform.OS === 'android') {
      SplashScreen.hide()
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={images.SPLASH_GRADIENT}
          style={styles.gradientImage}
          resizeMode="cover"
        />
        <View style={styles.logoContainer}>
          <Image
            source={images.LOGO_WHITE}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BRAND_PINK,
  },
  gradientImage: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.BRAND_PINK,
  },
  logoContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: '65%',
    maxWidth: 241,
  },
})

const mapStateToProps = R.applySpec({
  userName: profileSelectors.getUserName,
})

export default connect(
  mapStateToProps,
  null,
)(Splash)
