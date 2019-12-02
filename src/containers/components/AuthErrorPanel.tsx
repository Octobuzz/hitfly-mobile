import React, { useCallback, forwardRef } from 'react'
import { ActionSheet, ActionSheetInstance } from 'src/components'
import { routes } from 'src/constants'

import { useNavigation } from 'src/Hooks'

const AuthErrorPanel = forwardRef<ActionSheetInstance>((_, ref) => {
  const navigation = useNavigation()

  const handlePress = useCallback((index: number): void => {
    switch (index) {
      case 0: {
        navigation.navigate(routes.APP.AUTH)
        break
      }
    }
  }, [])

  return (
    <ActionSheet
      ref={ref}
      message="Для выполнения следующего действия требуется Авторизация"
      options={['Войти', 'Отмена']}
      cancelButtonIndex={1}
      onPress={handlePress}
    />
  )
})

export default AuthErrorPanel
