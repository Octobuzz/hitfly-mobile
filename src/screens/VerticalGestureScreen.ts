import React from 'react'
import PropTypes from 'prop-types'
import {
  BackHandler,
  Animated,
  Easing,
  Platform,
  PanResponder,
} from 'react-native'
import { sizes, names } from '../constants'
import { getNumberMultiple_05 } from '../utils/helpers'
import { Navigator } from '../navigation'

const MOVE_DETECT_BOUND = Platform.OS === 'ios' ? 2 : 4

class VerticalGestureScreen extends React.Component {
  static propTypes = {
    componentId: PropTypes.string,
  }

  constructor() {
    super()
    this.state = {}

    this.screenTranslateYAnimation = new Animated.Value(sizes.WINDOW_HEIGHT)

    this.gestureState = {
      y0: 0,
      boundedY0: 0,
      prevDy: 0,
      firstMoveDetected: false,
      lastMoveDirection: '',
    }

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderGrant: this._onPanResponderStart,
      onPanResponderMove: this._onPanResponderMove,
      onPanResponderRelease: this._onPanResponderEnd,
      onPanResponderTerminate: this._onPanResponderEnd,
    })
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this._onAndroidBackPress,
    )
    this._showFullScreen()
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  _onAndroidBackPress = () => {
    this._hideScreen()
    return true
  }

  _onPanResponderStart = (event, gestureState) => {
    const { y0 } = gestureState
    this.gestureState = {
      ...this.gestureState,
      y0: getNumberMultiple_05(y0),
      prevDy: 0,
      boundedY0: 0,
      firstMoveDetected: false,
      lastMoveDirection: '',
    }
    // console.log('жест начался: \n', `y0: ${getNumberMultiple_05(y0)} `)
  }

  _onPanResponderMove = (event, gestureState) => {
    const { dy, moveY } = gestureState
    const roundDy = getNumberMultiple_05(dy)
    const roundMoveY = getNumberMultiple_05(moveY)

    // console.log(`перемещение? roundDy: ${roundDy} dy: ${dy} `, {
    //   ...gestureState,
    // })
    if (
      !this.gestureState.firstMoveDetected &&
      Math.abs(roundDy) >= MOVE_DETECT_BOUND
    ) {
      // если до этого жеста не было и пройден игнорируемый интервал
      this.gestureState = {
        ...this.gestureState,
        boundedY0: roundMoveY,
        firstMoveDetected: true,
        prevDy: roundDy,
        lastMoveDirection:
          roundDy > this.gestureState.prevDy
            ? names.MOVES.DOWN
            : names.MOVES.UP,
      }
      // console.log(
      //   `Обнаружено вертикальное перемещение: ${
      //     this.gestureState.lastMoveDirection
      //   } dy: ${roundDy}`,
      // )
    } else if (this.gestureState.firstMoveDetected && roundDy >= 0) {
      this.gestureState = {
        ...this.gestureState,
        prevDy: roundDy,
        lastMoveDirection:
          roundDy > this.gestureState.prevDy
            ? names.MOVES.DOWN
            : names.MOVES.UP,
      }
      this._onVerticalScreenMove(roundMoveY - this.gestureState.boundedY0)
      // console.log(
      //   `перемещение: ${this.gestureState.lastMoveDirection} dy: ${roundDy}`,
      // )
    }
  }

  _onPanResponderEnd = (event, gestureState) => {
    const { moveY } = gestureState
    const roundMoveY = getNumberMultiple_05(moveY)
    // console.log(
    //   `жест завершен: ${
    //     this.gestureState.firstMoveDetected ? 'MOVED' : 'CLICKED'
    //   }  dy: ${roundDy}`,
    //   { ...gestureState },
    // )
    if (this.gestureState.firstMoveDetected) {
      this._onVerticalScreenMoveEnd(
        this.gestureState.lastMoveDirection,
        roundMoveY - this.gestureState.boundedY0,
      )
    }
    this.gestureState = {
      y0: 0,
      boundedY0: 0,
      prevDy: 0,
      firstMoveDetected: false,
      lastMoveDirection: '',
    }
  }

  _getVerticalMovePosition = dy => {
    if (sizes.WINDOW_HEIGHT - dy >= sizes.WINDOW_HEIGHT) {
      return 0
    } else if (sizes.WINDOW_HEIGHT - dy <= 0) {
      return sizes.WINDOW_HEIGHT
    } else {
      return dy
    }
  }

  _onVerticalScreenMove = dy => {
    this._animateScreenTranslateY(this._getVerticalMovePosition(dy), 0)
  }

  _onVerticalScreenMoveEnd = (lastMoveDirection, dy) => {
    const movePosition = this._getVerticalMovePosition(dy)
    if (lastMoveDirection === names.MOVES.UP) {
      const duration = (400 * movePosition) / sizes.WINDOW_HEIGHT
      this._animateScreenTranslateY(0, duration)
    } else {
      const duration =
        (400 * (sizes.WINDOW_HEIGHT - movePosition)) / sizes.WINDOW_HEIGHT
      this._animateScreenTranslateY(sizes.WINDOW_HEIGHT, duration)
    }
  }

  _animateScreenTranslateY = (toValue, duration = 400) => {
    Animated.timing(this.screenTranslateYAnimation, {
      toValue,
      duration,
      // easing: duration ? Easing.bezier(0.5, 0, 0.5, 1) : Easing.linear,
      easing: duration
        ? Easing.out(Easing.bezier(0.5, 0, 0.5, 1))
        : Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      if (toValue === sizes.WINDOW_HEIGHT) {
        const { componentId } = this.props
        Navigator.dismissOverlay({ componentId })
      }
    })
  }

  _hideScreen = () => {
    this._animateScreenTranslateY(sizes.WINDOW_HEIGHT)
  }

  _showFullScreen = () => {
    this._animateScreenTranslateY(0)
  }
}

export default VerticalGestureScreen
