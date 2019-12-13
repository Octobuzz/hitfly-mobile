import React from 'react'
import { Platform } from 'react-native'
import { colors } from './settings'
import styled from 'src/styled-components'

export const Wrapper = styled.KeyboardAvoidingView.attrs(() => ({
  behavior: Platform.OS === 'ios' && 'padding',
}))`
  flex: 1;
  padding: 16px;
`

export const TextBase = styled.Text`
  ${Platform.OS === 'android' && 'font-family: Roboto;'}
  font-size: 16;
  color: ${colors.main};
`

export const Input = styled.TextInput.attrs(() => ({
  selectionColor: colors.main,
}))`
  border-color: ${colors.main};
  color: ${colors.main};
  font-size: 16;
  border-radius: 4px;
  padding: 4px;
  border-width: 1px;
  margin-bottom: 16px;
`

const ButtonText = styled(TextBase)`
  text-align: center;
`

const ButtonWrapper = styled.TouchableOpacity`
  padding: 8px 16px;
  margin-bottom: 16px;
`

export const Button: React.FC<{ title: string; onPress: () => void }> = ({
  title,
  onPress,
}) => (
  <ButtonWrapper onPress={onPress}>
    <ButtonText>{title}</ButtonText>
  </ButtonWrapper>
)
