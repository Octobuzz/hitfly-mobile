import React from 'react'
import { Animated, Easing, Platform, PanResponder } from 'react-native'
import { sizes, names } from '../../constants'
import { getNumberMultiple_05 } from '../../utils/helpers'
import TrackPlayerServices from './TrackPlayerServices'

const MOVE_DETECT_BOUND = Platform.OS === 'ios' ? 2 : 4

class PlayerPanResponder extends TrackPlayerServices {
  constructor(props) {
    super(props)

    this.totalTime = 0
    this.currentTime = 0
    this.rewindTime = 0
    this.isRewinded = false
    this.isPlayed = false
    this.isFullScreen = false
    this.isPlayerTracksOpened = false

    this.screenHeightAnimation = new Animated.Value(0)
    this.minTimelineTranslateX = new Animated.Value(0)
    this.minTimelineTranslateX_value = 0

    this.minPlayerRef = React.createRef()
    this.fullPlayerArtworkRef = React.createRef()
    this.fullPlayerTimeLineRef = React.createRef()
    this.fullPlayerTimePinRef = React.createRef()

    this.gestureState = {
      x0: 0,
      y0: 0,
      boundedX0: 0,
      boundedY0: 0,
      prevDx: 0,
      prevDy: 0,
      playerInitialGestureTime: 0,
      firstMoveDetected: false,
      initialMoveAxis: '',
      initialMoveDirection: '',
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

  _onPanResponderStart = (event, gestureState) => {
    const { x0, y0 } = gestureState
    this.gestureState = {
      x0: getNumberMultiple_05(x0),
      y0: getNumberMultiple_05(y0),
      prevDx: 0,
      prevDy: 0,
      firstMoveDetected: false,
      initialMoveAxis: '',
      initialMoveDirection: '',
      lastMoveDirection: '',
    }
    // console.log(
    //   'жест начался: \n',
    //   `x0: ${getNumberMultiple_05(x0)} `,
    //   `y0: ${getNumberMultiple_05(y0)} `,
    // )
  }

  _onPanResponderMove = (event, gestureState) => {
    const { dx, dy, moveX, moveY } = gestureState
    const roundDx = getNumberMultiple_05(dx)
    const roundDy = getNumberMultiple_05(dy)
    const roundMoveX = getNumberMultiple_05(moveX)
    const roundMoveY = getNumberMultiple_05(moveY)

    // console.log(
    //   `перемещение? roundDx: ${roundDx} roundDy: ${roundDy} dx: ${dx} dy: ${dy} `,
    //   gestureState,
    // )
    // console.log(`перемещение?`)
    if (
      !this.gestureState.firstMoveDetected &&
      (Math.abs(roundDx) >= MOVE_DETECT_BOUND ||
        Math.abs(roundDy) >= MOVE_DETECT_BOUND)
    ) {
      if (Math.abs(roundDx) >= Math.abs(roundDy)) {
        this.gestureState = {
          ...this.gestureState,
          boundedX0: roundMoveX,
          boundedY0: roundMoveY,
          firstMoveDetected: true,
          initialMoveAxis: names.MOVES.HORIZONTAL,
          initialMoveDirection:
            roundDx > 0 ? names.MOVES.RIGHT : names.MOVES.LEFT,
          playerInitialGestureTime: this.currentTime,
          prevDx: roundDx,
          lastMoveDirection:
            roundDx > this.gestureState.prevDx
              ? names.MOVES.RIGHT
              : names.MOVES.LEFT,
        }
        this._onFullPlayerRewindStart()
        // console.log(
        //   `Обнаружено горизонтальное перемещение: ${
        //     this.gestureState.lastMoveDirection
        //   } dx: ${roundDx}`,
        // )
      } else {
        this.gestureState = {
          ...this.gestureState,
          boundedX0: roundMoveX,
          boundedY0: roundMoveY,
          firstMoveDetected: true,
          initialMoveAxis: names.MOVES.VERTICAL,
          initialMoveDirection: roundDy > 0 ? names.MOVES.DOWN : names.MOVES.UP,
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
      }
    } else if (this.gestureState.firstMoveDetected) {
      if (
        this.gestureState.initialMoveAxis === names.MOVES.HORIZONTAL &&
        this.gestureState.prevDx !== roundDx
      ) {
        this.gestureState = {
          ...this.gestureState,
          prevDx: roundDx,
          lastMoveDirection:
            roundDx > this.gestureState.prevDx
              ? names.MOVES.RIGHT
              : names.MOVES.LEFT,
        }
        this._onFullPlayerRewind(roundMoveX - this.gestureState.boundedX0)
        // console.log(
        //   `перемещение: ${this.gestureState.lastMoveDirection} dx: ${roundDx}`,
        // )
      } else if (
        this.gestureState.initialMoveAxis === names.MOVES.VERTICAL &&
        this.gestureState.prevDy !== roundDy
      ) {
        this.gestureState = {
          ...this.gestureState,
          prevDy: roundDy,
          lastMoveDirection:
            roundDy > this.gestureState.prevDy
              ? names.MOVES.DOWN
              : names.MOVES.UP,
        }
        if (this.gestureState.initialMoveDirection === names.MOVES.DOWN) {
          this._onVerticalScreenMove(roundMoveY - this.gestureState.boundedY0)
        }
        // console.log(
        //   `перемещение: ${this.gestureState.lastMoveDirection} dy: ${roundDy}`,
        // )
      }
    }
  }

  _onPanResponderEnd = (event, gestureState) => {
    const { moveY } = gestureState
    // const roundDx = getNumberMultiple_05(dx)
    // const roundDy = getNumberMultiple_05(dy)
    const roundMoveY = getNumberMultiple_05(moveY)
    // console.log(
    //   `жест завершен: ${
    //     this.gestureState.firstMoveDetected ? 'MOVED' : 'CLICKED'
    //   }  dx: ${roundDx} dy: ${roundDy}`,
    // )
    if (!this.gestureState.firstMoveDetected) {
      this._onPressPlayPause()
    } else {
      if (this.gestureState.initialMoveAxis === names.MOVES.HORIZONTAL) {
        this._onFullPlayerRewindEnd()
      } else if (this.gestureState.initialMoveDirection === names.MOVES.DOWN) {
        this._onVerticalScreenMoveEnd(
          this.gestureState.lastMoveDirection,
          roundMoveY - this.gestureState.boundedY0,
        )
      }
    }
    this.gestureState = {
      x0: 0,
      y0: 0,
      boundedX0: 0,
      boundedY0: 0,
      prevDx: 0,
      prevDy: 0,
      playerInitialGestureTime: 0,
      firstMoveDetected: false,
      initialMoveAxis: '',
      initialMoveDirection: '',
      lastMoveDirection: '',
    }
  }

  _onFullPlayerRewindStart = () => {
    this.isRewinded = true
    this.fullPlayerTimePinRef.current.animateToRewindOn()
    if (this.isPlayed) {
      this.fullPlayerArtworkRef.current.animateToBlur()
    }
  }

  _onFullPlayerRewind = dx => {
    let playerCurrentTime = this.gestureState.playerInitialGestureTime - dx
    let rewindOffset = 0
    if (playerCurrentTime >= this.totalTime) {
      rewindOffset = playerCurrentTime - this.totalTime
      playerCurrentTime = this.totalTime
    } else if (playerCurrentTime <= 0) {
      rewindOffset = playerCurrentTime
      playerCurrentTime = 0
    }
    this.rewindTime = playerCurrentTime
    this.fullPlayerTimePinRef.current.setTime(this.rewindTime, this.totalTime)
    this.fullPlayerTimeLineRef.current.animateToTime(
      this.rewindTime,
      this.totalTime,
      rewindOffset,
    )
    this.fullPlayerArtworkRef.current.animateToTime(
      this.rewindTime,
      this.totalTime,
    )
  }

  _onFullPlayerRewindEnd = () => {
    this.isRewinded = false
    this.currentTime = this.rewindTime
    this.rewindTime = 0
    this.fullPlayerTimePinRef.current.animateToRewindOff()
    this.fullPlayerTimeLineRef.current.animateToTime(
      this.currentTime,
      this.totalTime,
      0,
      true,
    )
    this.minPlayerRef.current.animateToTime(this.currentTime, this.totalTime)
    if (this.isPlayed) {
      this.fullPlayerArtworkRef.current.animateToFocus()
    }
  }

  _onMinPlayerRewindStart = time => {
    this.isRewinded = true
  }

  _onMinPlayerRewindEnd = time => {
    this.playerCurrentTime = time
    this.fullPlayerArtworkRef.current.animateToTime(time, this.totalTime)
    this.fullPlayerTimeLineRef.current.animateToTime(time, this.totalTime)
    this.fullPlayerTimePinRef.current.setTime(time, this.totalTime)
    this.isRewinded = false
  }

  _onPressPlayPause = () => {
    // this.isPlayed = !this.isPlayed
    // this.fullPlayerTimeLineRef.current.animatePlayPause(this.isPlayed)
    // this.fullPlayerArtworkRef.current[
    //   this.isPlayed ? 'animateToFocus' : 'animateToBlur'
    // ]()
    // this.minPlayerRef.current.playPause(this.isPlayed)
  }

  _getVerticalMovePosition = dy => {
    if (sizes.WINDOW_HEIGHT - dy >= sizes.WINDOW_HEIGHT) {
      return sizes.WINDOW_HEIGHT
    } else if (sizes.WINDOW_HEIGHT - dy <= sizes.MIN_PLAYER_HEIGHT) {
      return sizes.MIN_PLAYER_HEIGHT
    } else {
      return sizes.WINDOW_HEIGHT - dy
    }
  }

  _onVerticalScreenMove = dy => {
    this._animateScreenHeight(this._getVerticalMovePosition(dy), 0)
  }

  _onVerticalScreenMoveEnd = (lastMoveDirection, dy) => {
    const movePosition = this._getVerticalMovePosition(dy)
    if (lastMoveDirection === names.MOVES.UP) {
      const duration =
        (400 * (sizes.WINDOW_HEIGHT - movePosition)) /
        (sizes.WINDOW_HEIGHT - sizes.MIN_PLAYER_HEIGHT)
      this._showFullScreenPlayer(duration)
    } else {
      const duration =
        (400 * (movePosition - sizes.MIN_PLAYER_HEIGHT)) /
        (sizes.WINDOW_HEIGHT - sizes.MIN_PLAYER_HEIGHT)
      this._showMinPlayer(duration)
    }
  }

  _animateScreenHeight = (toValue, duration = 400, callback) => {
    Animated.timing(this.screenHeightAnimation, {
      toValue,
      duration,
      easing: duration ? Easing.bezier(0.5, 0, 0.5, 1) : Easing.linear,
    }).start(() => {
      callback && callback()
    })
  }

  _showMinPlayer = (duration = 400) => {
    this._animateScreenHeight(sizes.MIN_PLAYER_HEIGHT, duration, () => {
      this.isFullScreen = false
    })
  }

  _showFullScreenPlayer = (duration = 400) => {
    this._animateScreenHeight(sizes.WINDOW_HEIGHT, duration, () => {
      this.isFullScreen = true
    })
  }
}

export default PlayerPanResponder
