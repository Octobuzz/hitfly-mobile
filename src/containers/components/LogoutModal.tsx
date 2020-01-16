import React, { useCallback, useState, forwardRef } from 'react'
import { Link, Button, TextBase, Modal } from 'src/components'
import { useLogout } from 'src/hooks'
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
  const [isClosedByLogout, setClosedByLogout] = useState(false)

  const hide = useCallback((): void => {
    if (typeof ref === 'object' && ref && ref.current) {
      ref.current.hide()
    }
  }, [])

  const handlePressLogout = useCallback(() => {
    setClosedByLogout(true)
    hide()
  }, [])

  const handleModalHide = useCallback(() => {
    if (isClosedByLogout) {
      setClosedByLogout(false)
      logout()
    }
  }, [isClosedByLogout, logout])

  return (
    <Modal onModalHide={handleModalHide} onClose={hide} ref={ref}>
      <LogoutText>Вы уверены, что хотите выйти из аккаута?</LogoutText>
      <IndetedButton onPress={handlePressLogout} title="Выйти" />
      <Link type="dark" title="Отмена" onPress={hide} />
    </Modal>
  )
})

export default LogoutModal
