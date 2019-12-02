import React, { forwardRef, Ref } from 'react'
import { StyleSheet } from 'react-native'
import {
  ActionSheetCustom,
  ActionSheetCustomProps,
} from 'react-native-actionsheet'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import theme from 'src/theme'

interface Props extends ActionSheetCustomProps {
  // TS говно, не захотел подхватить ref
  ref: Ref<ActionSheetCustom>
}

export type ActionSheetInstance = ActionSheetCustom

const ActionSheet: React.FC<Props> = forwardRef<ActionSheetCustom, Props>(
  (props, ref) => {
    return (
      <ActionSheetCustom
        {...props}
        buttonUnderlayColor={theme.colors.buttonUnderlayColor}
        tintColor={theme.colors.white}
        ref={ref}
        styles={styles}
      />
    )
  },
)

// Для библиотеки так
const styles = StyleSheet.create({
  wrapper: { paddingBottom: getBottomSpace() },
  body: {
    backgroundColor: theme.colors.black,
  },
  titleText: {
    color: theme.colors.white,
    fontFamily: theme.fonts.bold,
  },
  messageText: {
    color: theme.colors.white,
    fontSize: 14,
    textAlign: 'center',
    fontFamily: theme.fonts.regular,
  },
  messageBox: {
    height: 50,
    paddingBottom: 0,
    backgroundColor: theme.colors.black,
  },
  titleBox: {
    backgroundColor: theme.colors.black,
  },
  buttonBox: {
    height: 50,
    backgroundColor: theme.colors.black,
  },
  buttonText: {
    color: theme.colors.white,
    fontFamily: theme.fonts.regular,
  },
  cancelButtonBox: {
    height: 50,
    marginTop: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.black,
  },
})

export default ActionSheet
