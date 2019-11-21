import React, { useCallback, useMemo, forwardRef, useContext } from 'react'
import { Animated } from 'react-native'
import { NavigationContext } from 'react-navigation'
import {
  View,
  Link,
  Button,
  TextBase,
  SlidingPanel,
  SlidingPanelInstance,
} from 'src/components'
import { routes } from 'src/constants'
import styled from 'src/styled-components'

const LogoutText = styled(TextBase)`
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
`

const LogoutBoldText = styled(LogoutText)`
  font-family: ${({ theme }) => theme.fonts.bold};
`

const IndetedButton = styled(Button)`
  margin-top: 32px;
  margin-bottom: 24px;
`

const AuthErrorPanel = forwardRef<SlidingPanelInstance>((_, ref) => {
  const animatedValue: Animated.Value = useMemo(() => {
    return new Animated.Value(0)
  }, [])

  const hidePanel = useCallback((): void => {
    if (typeof ref === 'object' && ref && ref.current) {
      ref.current.hide()
    }
  }, [])

  const navigation = useContext(NavigationContext)

  const navigateToLogin = useCallback(() => {
    navigation.navigate(routes.APP.AUTH)
  }, [])

  return (
    <SlidingPanel animatedValue={animatedValue} ref={ref}>
      <View paddingBottom={32} noFill>
        <LogoutText>
          Для выполнения следующего действия требуется{' '}
          <LogoutBoldText>Авторизация</LogoutBoldText>
        </LogoutText>
        <IndetedButton onPress={navigateToLogin} title="Войти" />
        <Link type="dark" title="Отмена" onPress={hidePanel} />
      </View>
    </SlidingPanel>
  )
})

export default AuthErrorPanel
