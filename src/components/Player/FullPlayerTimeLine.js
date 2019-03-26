import R from 'ramda'
import React, { Component } from 'react'
import { StyleSheet, View, Animated, Easing, ViewPropTypes } from 'react-native'
import RNLinearGradient from 'react-native-linear-gradient'
import { colors, sizes } from '../../constants'
import { getSectionGradientColor } from '../../utils/helpers'

class FullPlayerTimeLine extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayLevels: [],
    }
    this.totalTime = 0
    this.topColumnsHeightAnimations = []
    this.bottomColumnsHeightAnimations = []
    this.columnsFlexAnimations = []
    this.columnsFlexAnimationsValues = []
    this.timelineControlLeftAnimation = new Animated.Value(0)
    this.pausedTimelineLeftAnimation = new Animated.Value(0)
    this.pausedTimelineOpacityAnimation = new Animated.Value(1)
  }

  init = (currentTime, totalTime, levels, isPlayed = false) => {
    const displayLevels = this._getDisplayLevelsAndUpdateAnimations(
      levels,
      totalTime,
      currentTime,
      isPlayed,
    )
    this.setState({ displayLevels })
  }

  animateToTime = (currentTime, totalTime) => {
    const time = Math.trunc(currentTime * 10) / 10
    const { displayLevels } = this.state
    let leftOffset = 0
    let animations = []
    displayLevels.forEach((item, index, arr) => {
      const { positionInPart, columnFlex } = this._getCurrentAnimatePosition(
        time,
        totalTime,
        index,
        arr.length,
      )
      leftOffset = leftOffset - positionInPart
      if (columnFlex !== this.columnsFlexAnimationsValues[index]) {
        this.columnsFlexAnimationsValues[index] = columnFlex
        animations.push(
          Animated.timing(this.columnsFlexAnimations[index], {
            toValue: columnFlex,
            duration: 0,
          }),
        )
      }
    })
    leftOffset = Math.trunc(leftOffset * 10) / 10
    animations.push(
      Animated.timing(this.timelineControlLeftAnimation, {
        toValue: sizes.WINDOW_WIDTH / 2 + leftOffset,
        duration: 0,
      }),
    )
    animations.push(
      Animated.timing(this.pausedTimelineLeftAnimation, {
        toValue: -leftOffset,
        duration: 0,
      }),
    )
    Animated.parallel(animations).start()
  }

  animatePlayPause = (animateToPlay = false) => {
    const { displayLevels } = this.state
    let animations = []
    this._stopPlayPauseAnimations()
    this.topColumnsHeightAnimations.forEach((item, index) => {
      animations.push(
        Animated.timing(item, {
          toValue: animateToPlay
            ? sizes.FULL_PLAYER_TIMELINE_TOP_HEIGHT *
              (displayLevels[index] || 0)
            : 0,
          duration: 200,
          easing: Easing.bezier(0.5, 0, 0.5, 1),
        }),
      )
    })
    this.bottomColumnsHeightAnimations.forEach((item, index) => {
      animations.push(
        Animated.timing(item, {
          toValue: animateToPlay
            ? sizes.FULL_PLAYER_TIMELINE_BOTTOM_HEIGHT *
              (displayLevels[index] || 0)
            : 0,
          duration: 200,
          easing: Easing.bezier(0.5, 0, 0.5, 1),
        }),
      )
    })
    animations.push(
      Animated.timing(this.pausedTimelineOpacityAnimation, {
        toValue: animateToPlay ? 0 : 1,
        duration: 200,
        easing: Easing.bezier(0.5, 0, 0.5, 1),
      }),
    )
    Animated.parallel(animations).start()
  }

  _stopPlayPauseAnimations = () => {
    let animations = []
    this.topColumnsHeightAnimations.forEach(item => {
      animations.push(Animated.timing(item))
    })
    this.bottomColumnsHeightAnimations.forEach(item => {
      animations.push(Animated.timing(item))
    })
    animations.push(Animated.timing(this.pausedTimelineOpacityAnimation))
    Animated.parallel(animations).stop()
  }

  _getDisplayLevelsAndUpdateAnimations = (
    levels,
    totalTime,
    currentTime,
    isPlayed,
  ) => {
    const displayLevelsCount = Math.ceil(Math.ceil(totalTime) / 3)
    let displayLevels = []
    let leftOffset = 0

    for (let i = 0; i < displayLevelsCount; i++) {
      const currentLevel = R.max(
        levels[i * 3] || 0,
        levels[i * 3 + 1] || 0,
        levels[i * 3 + 2] || 0,
      )
      displayLevels.push(currentLevel)

      const { positionInPart, columnFlex } = this._getCurrentAnimatePosition(
        currentTime,
        totalTime,
        displayLevels.length - 1,
        displayLevelsCount,
      )

      leftOffset = leftOffset - positionInPart
      this.topColumnsHeightAnimations[i] = new Animated.Value(
        isPlayed ? sizes.FULL_PLAYER_TIMELINE_TOP_HEIGHT * currentLevel : 0,
      )
      this.bottomColumnsHeightAnimations[i] = new Animated.Value(
        isPlayed ? sizes.FULL_PLAYER_TIMELINE_BOTTOM_HEIGHT * currentLevel : 0,
      )
      this.columnsFlexAnimations[i] = new Animated.Value(columnFlex)
      this.columnsFlexAnimationsValues[i] = columnFlex
    }

    this.timelineControlLeftAnimation = new Animated.Value(
      sizes.WINDOW_WIDTH / 2 + leftOffset,
    )
    this.pausedTimelineLeftAnimation = new Animated.Value(-leftOffset)
    return displayLevels
  }

  _getCurrentAnimatePosition = (time, totalTime, index, length) => {
    const positionInPart =
      time < index * 3 ? 0 : time > index * 3 + 3 ? 3 : time - index * 3
    const columnFlex =
      (length - 1 === index && time === totalTime) || positionInPart >= 2
        ? 0
        : positionInPart === 0
        ? 1
        : 1 - Math.trunc((positionInPart / 2) * 10) / 10
    return { positionInPart, columnFlex }
  }

  render() {
    const { displayLevels } = this.state
    const pausedTimelineGrayStyle = [
      styles.pausedTimelineGray,
      {
        transform: [
          {
            translateX: this.pausedTimelineLeftAnimation,
          },
        ],
      },
    ]
    const pausedTimelineContainerStyle = [
      styles.pausedTimelineContainer,
      { opacity: this.pausedTimelineOpacityAnimation },
    ]

    return (
      <View style={[styles.wrapper, this.props.styleWrapper]}>
        <Animated.View
          style={[
            styles.timelineControl,
            {
              width: displayLevels.length * 3,
              left: this.timelineControlLeftAnimation,
            },
          ]}
        >
          <View style={styles.lightRow}>
            {displayLevels.map((item, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.levelColumn,
                  {
                    backgroundColor: getSectionGradientColor(
                      colors.BRAND_BLUE,
                      colors.BRAND_PINK,
                      (index + 1) / displayLevels.length,
                    ),
                    height: this.topColumnsHeightAnimations[index],
                  },
                ]}
              >
                <Animated.View
                  style={[
                    styles.columnFill,
                    { flex: this.columnsFlexAnimations[index] },
                  ]}
                />
              </Animated.View>
            ))}
          </View>
          <View style={styles.darkRow}>
            {this.state.displayLevels.map((item, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.levelColumn,
                  {
                    backgroundColor: getSectionGradientColor(
                      colors.BRAND_BLUE,
                      colors.BRAND_PINK,
                      (index + 1) / displayLevels.length,
                    ),
                    height: this.bottomColumnsHeightAnimations[index],
                  },
                ]}
              >
                <Animated.View
                  style={[
                    styles.columnFill,
                    { flex: this.columnsFlexAnimations[index] },
                  ]}
                />
              </Animated.View>
            ))}
          </View>
          <Animated.View style={pausedTimelineContainerStyle}>
            <RNLinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={[colors.BRAND_BLUE, colors.BRAND_PINK]}
              style={styles.pausedTimelineGradient}
            >
              <Animated.View style={pausedTimelineGrayStyle}>
                <View style={styles.pausedTimelineCursor} />
              </Animated.View>
            </RNLinearGradient>
          </Animated.View>
        </Animated.View>
      </View>
    )
  }
}

FullPlayerTimeLine.propTypes = {
  styleWrapper: ViewPropTypes.style,
}

FullPlayerTimeLine.defaultProps = {}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height:
      sizes.FULL_PLAYER_TIMELINE_TOP_HEIGHT +
      sizes.FULL_PLAYER_TIMELINE_BOTTOM_HEIGHT,
  },
  timelineControl: {
    position: 'absolute',
    top: 0,
    height: '100%',
  },
  lightRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: sizes.FULL_PLAYER_TIMELINE_TOP_HEIGHT,
  },
  darkRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    opacity: 0.45,
    height: sizes.FULL_PLAYER_TIMELINE_BOTTOM_HEIGHT,
  },
  levelColumn: {
    marginRight: 1,
    width: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  columnFill: {
    backgroundColor: colors.WHITE,
  },
  pausedTimelineContainer: {
    position: 'absolute',
    left: 0,
    top:
      sizes.FULL_PLAYER_TIMELINE_TOP_HEIGHT - sizes.MIN_PLAYER_TIMELINE_HEIGHT,
    width: '100%',
    height: sizes.MIN_PLAYER_TIMELINE_HEIGHT,
  },
  pausedTimelineGradient: {
    flex: 1,
    overflow: 'hidden',
  },
  pausedTimelineGray: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    transform: [
      {
        translateX: 0,
      },
    ],
    backgroundColor: colors.PLAYER_TIMELINE_GRAY,
  },
  pausedTimelineCursor: {
    backgroundColor: colors.BLACK,
    position: 'absolute',
    top: 0,
    left: -1,
    width: 3,
    height: sizes.MIN_PLAYER_TIMELINE_HEIGHT,
  },
})

export default FullPlayerTimeLine
