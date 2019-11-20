import React, { useCallback, useMemo, forwardRef, Ref } from 'react'
import { Animated } from 'react-native'
import {
  View,
  Link,
  Button,
  TextBase,
  SlidingPanel,
  SlidingPanelInstance,
} from 'src/components'
import styled from 'src/styled-components'
import { useLogout } from 'src/Hooks'

const LogoutText = styled(TextBase)`
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
`

const IndetedButton = styled(Button)`
  margin-top: 32px;
  margin-bottom: 24px;
`
const LogoutPanel = forwardRef<SlidingPanelInstance>((_, ref) => {
  const animatedValue: Animated.Value = useMemo(() => {
    return new Animated.Value(0)
  }, [])

  const hidePanel = useCallback((): void => {
    if (typeof ref === 'object' && ref && ref.current) {
      ref.current.hide()
    }
  }, [])

  const { isLoading, logout } = useLogout()

  return (
    <SlidingPanel animatedValue={animatedValue} ref={ref}>
      <View paddingBottom={32} noFill>
        <LogoutText>Вы уверены, что хотите выйти из аккаута?</LogoutText>
        <IndetedButton
          isLoading={isLoading}
          isDisabled={isLoading}
          onPress={logout}
          title="Выйти"
        />
        <Link type="dark" title="Отмена" onPress={hidePanel} />
      </View>
    </SlidingPanel>
  )
})

export default LogoutPanel
