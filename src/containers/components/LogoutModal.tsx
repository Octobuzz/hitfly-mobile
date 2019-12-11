import React, { useCallback, forwardRef } from 'react'
import { Link, Button, TextBase, Modal } from 'src/components'
import { routes } from 'src/constants'
import { useNavigation, useLogout } from 'src/hooks'
import styled from 'src/styled-components'

const LogoutText = styled(TextBase)`
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
`

const IndetedButton = styled(Button)`
  margin-top: 32px;
  margin-bottom: 24px;
`

const LogoutModal = forwardRef<Modal>((_, ref) => {
  const { logout } = useLogout()

  const hide = useCallback((): void => {
    if (typeof ref === 'object' && ref && ref.current) {
      ref.current.hide()
    }
  }, [])

  return (
    <Modal onClose={hide} ref={ref}>
      <LogoutText>Вы уверены, что хотите выйти из аккаута?</LogoutText>
      <IndetedButton onPress={logout} title="Выйти" />
      <Link type="dark" title="Отмена" onPress={hide} />
    </Modal>
  )
})

export default LogoutModal
