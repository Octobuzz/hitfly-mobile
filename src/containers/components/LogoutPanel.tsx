import React, { useCallback, forwardRef } from 'react'
import { ActionSheet, ActionSheetInstance } from 'src/components'
import { useLogout } from 'src/hooks'

const LogoutPanel = forwardRef<ActionSheetInstance>((_, ref) => {
  const { logout } = useLogout()

  const handlePress = useCallback(
    (index: number): void => {
      switch (index) {
        case 0: {
          logout()
          break
        }
      }
    },
    [logout],
  )

  return (
    <ActionSheet
      ref={ref}
      message="Вы уверены, что хотите выйти из аккаута?"
      options={['Выйти', 'Отмена']}
      cancelButtonIndex={1}
      onPress={handlePress}
    />
  )
})

export default LogoutPanel
