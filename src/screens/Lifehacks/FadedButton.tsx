import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import TextBase from 'src/components/TextBase'
import styled from 'src/styled-components'

const Wrapper = styled.TouchableOpacity`
  flex: 1;
`

const Inner = styled.View`
  padding: 10px 29px;
  border-radius: 28px;
  margin: 1px;
  background-color: ${({ theme }) => theme.colors.white};
`

const Text = styled(TextBase)<{ isActive?: boolean }>`
  text-align: center;
  overflow: hidden;
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.textMain : theme.colors.textGray};
`

// @ts-ignore
const Gradient = styled(LinearGradient).attrs(({ theme, isActive }) => ({
  colors: isActive
    ? [theme.colors.brandBlue, theme.colors.brandPink]
    : [theme.colors.inputBorder, theme.colors.inputBorder],
}))<{ isActive?: boolean }>`
  border-radius: 28px;
`

interface Props {
  onPress: () => void
  isActive?: boolean
  title: string
}

const FadedButton: React.FC<Props> = ({ isActive, title, ...rest }) => (
  <Wrapper {...rest}>
    <Gradient isActive={isActive}>
      <Inner>
        <Text isActive={isActive}>{title}</Text>
      </Inner>
    </Gradient>
  </Wrapper>
)

export default FadedButton
