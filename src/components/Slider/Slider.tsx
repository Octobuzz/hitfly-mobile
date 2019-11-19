import React, { PureComponent } from 'react'

import {
  View,
  Image,
  Easing,
  Animated,
  ViewStyle,
  StyleSheet,
  PanResponder,
  LayoutChangeEvent,
  ImageSourcePropType,
  PanResponderInstance,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native'

// Slider одолжен из react-native-slider
// однако он заброшен и много вещей устарело
// перенес на TS, поправил устаревшее API
// так же добавил некоторые PR сюда
// наверно стоит залить в отдельный NPM модуль

const TRACK_SIZE = 4
const THUMB_SIZE = 20

class Rect {
  x: number
  y: number
  width: number
  height: number
  constructor(x: number, y: number, width: number, height: number) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }

  containsPoint = (x: number, y: number) => {
    return (
      x >= this.x &&
      y >= this.y &&
      x <= this.x + this.width &&
      y <= this.y + this.height
    )
  }
}

const DEFAULT_ANIMATION_CONFIGS = {
  spring: {
    friction: 7,
    tension: 100,
  },
  timing: {
    duration: 150,
    easing: Easing.inOut(Easing.ease),
    delay: 0,
  },
}

export interface SliderProps {
  /**
   * Initial value of the slider. The value should be between minimumValue
   * and maximumValue, which default to 0 and 1 respectively.
   * Default value is 0.
   *
   * *This is not a controlled component*, e.g. if you don't update
   * the value, the component won't be reset to its inital value.
   */
  value: number

  /**
   * If true the user won't be able to move the slider.
   * Default value is false.
   */
  disabled?: boolean

  /**
   * Initial minimum value of the slider. Default value is 0.
   */
  minimumValue: number

  /**
   * Initial maximum value of the slider. Default value is 1.
   */
  maximumValue: number

  /**
   * Step value of the slider. The value should be between 0 and
   * (maximumValue - minimumValue). Default value is 0.
   */
  step: number

  /**
   * The color used for the track to the left of the button. Overrides the
   * default blue gradient image.
   */
  minimumTrackTintColor: string

  /**
   * The color used for the track to the right of the button. Overrides the
   * default blue gradient image.
   */
  maximumTrackTintColor: string

  /**
   * The color used for the thumb.
   */
  thumbTintColor: string

  /**
   * The size of the touch area that allows moving the thumb.
   * The touch area has the same center has the visible thumb.
   * This allows to have a visually small thumb while still allowing the user
   * to move it easily.
   * The default is {width: 40, height: 40}.
   */
  thumbTouchSize: {
    width: number
    height: number
  }

  /**
   * Callback continuously called while the user is dragging the slider.
   */
  onValueChange?: (value: number) => void

  /**
   * Callback called when the user starts changing the value (e.g. when
   * the slider is pressed).
   */
  onSlidingStart?: (value: number) => void

  /**
   * Callback called when the user finishes changing the value (e.g. when
   * the slider is released).
   */
  onSlidingComplete?: (value: number) => void

  /**
   * The style applied to the slider container.
   */
  style?: ViewStyle

  /**
   * The style applied to the track.
   */
  trackStyle?: ViewStyle

  /**
   * The style applied to the thumb.
   */
  thumbStyle?: ViewStyle

  /**
   * Sets an image for the thumb.
   */
  thumbImage?: ImageSourcePropType

  /**
   * Set this to true to visually see the thumb touch rect in green.
   */
  debugTouchArea?: boolean

  /**
   * Set to true to animate values with default 'timing' animation type
   */
  animateTransitions?: boolean

  /**
   * Custom Animation type. 'spring' or 'timing'.
   */
  animationType: 'spring' | 'timing'

  /**
   * Used to configure the animation parameters.  These are the same parameters in the Animated library.
   */
  animationConfig?: {}

  /**
   * Set to true to update the value whilst pressing the Slider
   */
  trackPressable?: boolean

  /**
   * Custom component used for the track to the left of the button.
   */
  customMinimumTrack: React.ReactNode

  /**
   * Custom component used for the track to the right of the button.
   */
  customMaximumTrack: React.ReactNode
}

interface State {
  containerSize: Size
  trackSize: Size
  thumbSize: Size
  allMeasured: boolean
}

interface Size {
  width: number
  height: number
}

interface TouchOverflowStyle {
  marginTop?: number
  marginBottom?: number
  marginLeft?: number
  marginRight?: number
  backgroundColor?: string
  opacity?: number
}

type MeasureName = 'containerSize' | 'trackSize' | 'thumbSize'

type EventName = 'onSlidingStart' | 'onValueChange' | 'onSlidingComplete'

export default class Slider extends PureComponent<SliderProps, State> {
  static defaultProps = {
    value: 0,
    minimumValue: 0,
    maximumValue: 1,
    step: 0,
    minimumTrackTintColor: '#3f3f3f',
    maximumTrackTintColor: '#b3b3b3',
    thumbTintColor: '#343434',
    thumbTouchSize: { width: 40, height: 40 },
    animationType: 'timing',
    customMinimumTrack: null,
    customMaximumTrack: null,
  }

  private panResponder: PanResponderInstance
  private animatedValue: Animated.Value
  private value: number
  private canChangeValue: boolean = true

  constructor(props: SliderProps) {
    super(props)
    this.state = {
      containerSize: { width: 0, height: 0 },
      trackSize: { width: 0, height: 0 },
      thumbSize: { width: 0, height: 0 },
      allMeasured: false,
    }
    this.value = props.value
    this.animatedValue = new Animated.Value(props.value)
    this.animatedValue.addListener(({ value: currentValue }) => {
      this.value = currentValue
    })
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this.handleMoveShouldSetPanResponder,
      onPanResponderGrant: this.handlePanResponderGrant,
      onPanResponderMove: this.handlePanResponderMove,
      onPanResponderRelease: this.handlePanResponderEnd,
      onPanResponderTerminationRequest: this.handlePanResponderRequestEnd,
      onPanResponderTerminate: this.handlePanResponderEnd,
    })
  }

  componentDidUpdate({ value: oldValue }: SliderProps) {
    const { value, animateTransitions } = this.props

    if (!this.canChangeValue) {
      return
    }

    if (value !== oldValue) {
      if (animateTransitions) {
        this.setCurrentValueAnimated(value)
      } else {
        this.setCurrentValue(value)
      }
    }
  }

  render() {
    const {
      style,
      minimumValue,
      maximumValue,
      minimumTrackTintColor,
      maximumTrackTintColor,
      customMinimumTrack,
      customMaximumTrack,
      thumbTintColor,
      thumbImage,
      trackStyle,
      thumbStyle,
      debugTouchArea,
      ...other
    } = this.props
    const { thumbSize, allMeasured, containerSize } = this.state

    const thumbLeft = this.animatedValue.interpolate({
      inputRange: [minimumValue, maximumValue],
      outputRange: [0, containerSize.width - thumbSize.width],
      // extrapolate: 'clamp',
    })

    const valueVisibleStyle: { opacity?: 0 } = {}
    if (!allMeasured) {
      valueVisibleStyle.opacity = 0
    }

    const minimumTrackStyle: any = {
      position: 'absolute',
      width: Animated.add(thumbLeft, thumbSize.width / 2),
      backgroundColor: minimumTrackTintColor,
      ...valueVisibleStyle,
    }
    const thumbStyles: any[] = [
      { backgroundColor: thumbTintColor },
      defaultStyles.thumb,
      thumbStyle,
      {
        transform: [{ translateX: thumbLeft }, { translateY: 0 }],
        ...valueVisibleStyle,
      },
    ]

    const touchOverflowStyle = this.getTouchOverflowStyle()

    return (
      <View
        {...other}
        style={[defaultStyles.container, style]}
        onLayout={this.measureContainer}
      >
        <View
          style={[
            { backgroundColor: maximumTrackTintColor },
            defaultStyles.track,
            trackStyle,
          ]}
          renderToHardwareTextureAndroid={true}
          onLayout={this.measureTrack}
        >
          {customMaximumTrack}
        </View>
        <Animated.View
          renderToHardwareTextureAndroid={true}
          style={[defaultStyles.track, trackStyle, minimumTrackStyle]}
        >
          {customMinimumTrack}
        </Animated.View>
        <Animated.View
          onLayout={this.measureThumb}
          renderToHardwareTextureAndroid={true}
          style={thumbStyles}
        >
          {this.renderThumbImage()}
        </Animated.View>
        <View
          renderToHardwareTextureAndroid={true}
          style={[defaultStyles.touchArea, touchOverflowStyle]}
          {...this.panResponder.panHandlers}
        >
          {debugTouchArea === true && this.renderDebugThumbTouchRect(thumbLeft)}
        </View>
      </View>
    )
  }

  private handleStartShouldSetPanResponder = (
    e: GestureResponderEvent /*gestureState: PanResponderGestureState*/,
  ): boolean => {
    // Should we become active when the user presses down on the thumb?
    const { trackPressable } = this.props
    return trackPressable ? true : this.thumbHitTest(e)
  }

  private handleMoveShouldSetPanResponder(/*e: GestureResponderEvent, gestureState: PanResponderGestureState*/): boolean {
    // Should we become active when the user moves a touch over the thumb?
    return false
  }

  private previousLeft: number = 0

  private handlePanResponderGrant = (
    e: GestureResponderEvent,
    // gestureState: PanResponderGestureState,
  ) => {
    this.canChangeValue = false
    const { trackPressable, thumbTouchSize } = this.props
    this.previousLeft = trackPressable
      ? e.nativeEvent.locationX - thumbTouchSize.width / 2
      : this.getThumbLeft(this.getCurrentValue())
    this.fireChangeEvent('onSlidingStart')
  }

  private handlePanResponderMove = (
    e: GestureResponderEvent,
    gestureState: PanResponderGestureState,
  ) => {
    if (this.props.disabled) {
      return
    }

    this.setCurrentValue(this.getValue(gestureState))
    this.fireChangeEvent('onValueChange')
  }

  handlePanResponderRequestEnd() /* 
    e: GestureResponderEvent,
    gestureState: PanResponderGestureState, 
    */ {
    // Should we allow another component to take over this pan?
    return false
  }

  private handlePanResponderEnd = (
    e: GestureResponderEvent,
    gestureState: PanResponderGestureState,
  ) => {
    if (this.props.disabled) {
      return
    }

    this.canChangeValue = true

    this.setCurrentValue(this.getValue(gestureState))
    this.fireChangeEvent('onSlidingComplete')
  }

  private measureContainer = (x: LayoutChangeEvent) => {
    this.handleMeasure('containerSize', x)
  }

  private measureTrack = (x: LayoutChangeEvent) => {
    this.handleMeasure('trackSize', x)
  }

  private measureThumb = (x: LayoutChangeEvent) => {
    this.handleMeasure('thumbSize', x)
  }

  private measures: Record<MeasureName, Size | null> = {
    containerSize: null,
    thumbSize: null,
    trackSize: null,
  }

  private handleMeasure = (name: MeasureName, x: LayoutChangeEvent) => {
    const { width, height } = x.nativeEvent.layout
    const size = { width, height }

    const currentSize = this.measures[name]
    if (
      currentSize &&
      width === currentSize.width &&
      height === currentSize.height
    ) {
      return
    }
    this.measures[name] = size

    if (
      this.measures.containerSize &&
      this.measures.trackSize &&
      this.measures.thumbSize
    ) {
      this.setState({
        containerSize: this.measures.containerSize,
        trackSize: this.measures.trackSize,
        thumbSize: this.measures.thumbSize,
        allMeasured: true,
      })
    }
  }

  private getRatio = (value: number): number => {
    const { minimumValue, maximumValue } = this.props
    return (value - minimumValue) / (maximumValue - minimumValue)
  }

  private getThumbLeft = (value: number): number => {
    const ratio = this.getRatio(value)
    return ratio * (this.state.containerSize.width - this.state.thumbSize.width)
  }

  private getValue = (gestureState: PanResponderGestureState) => {
    const length = this.state.containerSize.width - this.state.thumbSize.width
    const thumbLeft = this.previousLeft + gestureState.dx

    const ratio = thumbLeft / length

    if (this.props.step) {
      return Math.max(
        this.props.minimumValue,
        Math.min(
          this.props.maximumValue,
          this.props.minimumValue +
            Math.round(
              (ratio * (this.props.maximumValue - this.props.minimumValue)) /
                this.props.step,
            ) *
              this.props.step,
        ),
      )
    } else {
      return Math.max(
        this.props.minimumValue,
        Math.min(
          this.props.maximumValue,
          ratio * (this.props.maximumValue - this.props.minimumValue) +
            this.props.minimumValue,
        ),
      )
    }
  }

  private setCurrentValue = (value: number) => {
    this.animatedValue.setValue(value)
  }

  private getCurrentValue = (): number => {
    return this.value
  }

  private setCurrentValueAnimated = (value: number): void => {
    const { animationType, animationConfig } = this.props
    const config = {
      ...DEFAULT_ANIMATION_CONFIGS[animationType],
      ...animationConfig,
      toValue: value,
    }

    Animated[animationType](this.animatedValue, config).start()
  }

  private fireChangeEvent = (event: EventName) => {
    if (this.props[event]) {
      this.props[event]!(this.getCurrentValue())
    }
  }

  private getTouchOverflowSize = (): Size | undefined => {
    const { thumbSize, containerSize, allMeasured } = this.state
    const { thumbTouchSize } = this.props

    if (allMeasured === true) {
      const width = Math.max(0, thumbTouchSize.width - thumbSize.width)
      const height = Math.max(0, thumbTouchSize.height - containerSize.height)
      return { width, height }
    }
  }

  private getTouchOverflowStyle = (): TouchOverflowStyle => {
    const size = this.getTouchOverflowSize()

    const touchOverflowStyle: TouchOverflowStyle = {}
    if (size) {
      const { width, height } = size
      const verticalMargin = -height / 2
      touchOverflowStyle.marginTop = verticalMargin
      touchOverflowStyle.marginBottom = verticalMargin

      const horizontalMargin = -width / 2
      touchOverflowStyle.marginLeft = horizontalMargin
      touchOverflowStyle.marginRight = horizontalMargin
    }

    if (this.props.debugTouchArea === true) {
      touchOverflowStyle.backgroundColor = 'orange'
      touchOverflowStyle.opacity = 0.5
    }

    return touchOverflowStyle
  }

  private thumbHitTest = (e: GestureResponderEvent) => {
    const nativeEvent = e.nativeEvent
    const thumbTouchRect = this.getThumbTouchRect()
    return thumbTouchRect.containsPoint(
      nativeEvent.locationX,
      nativeEvent.locationY,
    )
  }

  private getThumbTouchRect = (): Rect => {
    const { thumbSize, containerSize } = this.state
    const { thumbTouchSize } = this.props
    const touchOverflowSize = this.getTouchOverflowSize()

    const x = touchOverflowSize
      ? touchOverflowSize.width / 2 +
        this.getThumbLeft(this.getCurrentValue()) +
        (thumbSize.width - thumbTouchSize.width) / 2
      : 0
    const y = touchOverflowSize
      ? touchOverflowSize.height / 2 +
        (containerSize.height - thumbTouchSize.height) / 2
      : 0

    return new Rect(x, y, thumbTouchSize.width, thumbTouchSize.height)
  }

  private renderDebugThumbTouchRect = (
    thumbLeft: Animated.AnimatedInterpolation,
  ): JSX.Element => {
    const thumbTouchRect = this.getThumbTouchRect()
    const positionStyle = {
      left: thumbLeft,
      top: thumbTouchRect.y,
      width: thumbTouchRect.width,
      height: thumbTouchRect.height,
    }

    return (
      <Animated.View
        style={[defaultStyles.debugThumbTouchArea, positionStyle]}
        pointerEvents="none"
      />
    )
  }

  private renderThumbImage = (): React.ReactNode => {
    const { thumbImage } = this.props

    if (thumbImage) {
      return <Image source={thumbImage} />
    }
  }
}

const defaultStyles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: 'center',
  },
  track: {
    height: TRACK_SIZE,
    borderRadius: TRACK_SIZE / 2,
  },
  thumb: {
    position: 'absolute',
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
  },
  touchArea: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  debugThumbTouchArea: {
    position: 'absolute',
    backgroundColor: 'green',
    opacity: 0.5,
  },
})
