import { useCallback, useState } from 'react'

interface ModalHideListenerConfig {
  hideModal: () => void
  action: () => any
}

const useModalHideListener = ({
  action,
  hideModal,
}: ModalHideListenerConfig) => {
  const [isClosedByAction, setClosedByAction] = useState(false)

  const handlePress = useCallback(() => {
    setClosedByAction(true)
    hideModal()
  }, [hideModal])

  const handleModalHide = useCallback(() => {
    if (isClosedByAction) {
      setClosedByAction(false)
      action()
    }
  }, [isClosedByAction, action])

  return {
    handlePress,
    handleModalHide,
  }
}

export default useModalHideListener
