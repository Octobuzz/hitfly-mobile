import React from 'react'
import { StyleSheet, View, ViewPropTypes, Text } from 'react-native'
import { colors, style } from '../constants'

const TextWithLines = props => {
  const { text, styleWrapper, styleText, numberOfLines } = props

  return (
    <View style={[styles.wrapper, styleWrapper]}>
      <View style={styles.line} />
      <Text style={[styles.text, styleText]} numberOfLines={numberOfLines}>
        {text}
      </Text>
      <View style={styles.line} />
    </View>
  )
}

TextWithLines.defaultProps = {
  text: '',
  numberOfLines: 0,
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.INPUT_BACKGROUND,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.EXTRA_GRAY_LABEL,
  },
  text: {
    ...style.text.regular,
    color: colors.GRAY_LABEL,
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
    paddingHorizontal: 8,
    maxWidth: '80%',
  },
})

export default TextWithLines
