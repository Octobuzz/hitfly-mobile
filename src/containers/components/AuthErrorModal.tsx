import React, { useCallback, forwardRef } from 'react'
import { Link, Button, TextBase, Modal } from 'src/components'
import { routes } from 'src/constants'
import { useNavigation, useModalHideListener } from 'src/hooks'
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

const AuthErrorModal = forwardRef<Modal>((_, ref) => {
  const navigation = useNavigation()
  const navigateToLogin = useCallback(() => {
    navigation.navigate(routes.APP.AUTH)
  }, [])

  const hide = useCallback((): void => {
    if (typeof ref === 'object' && ref && ref.current) {
      ref.current.hide()
    }
  }, [])

  const { handleModalHide, handlePress } = useModalHideListener({
    hideModal: hide,
    action: navigateToLogin,
  })

  return (
    <Modal onModalHide={handleModalHide} onClose={hide} ref={ref}>
      <LogoutText>
        Для выполнения следующего действия требуется{' '}
        <LogoutBoldText>Авторизация</LogoutBoldText>
      </LogoutText>
      <IndetedButton onPress={handlePress} title="Войти" />
      <Link type="dark" title="Отмена" onPress={hide} />
    </Modal>
  )
})

export default AuthErrorModal
