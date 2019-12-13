import React, { useState, useCallback } from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import styled from 'src/styled-components'
import { colors, password } from './settings'
import { routes } from 'src/constants'

import { Wrapper, TextBase, Input, Button } from './Components'

const Container = styled(Wrapper)`
  justify-content: center;
`

const Warning = styled(TextBase)`
  text-align: center;
  margin-bottom: 16px;
`

interface Props extends NavigationStackScreenProps {}

const Login: React.FC<Props> = ({ navigation }) => {
  const [value, setValue] = useState<string>('')

  const handleSubmit = useCallback(() => {
    if (password === value) {
      navigation.navigate(routes.EASTER_EGG.EGG_MAIN)
    }
    setValue('')
  }, [value])

  const handleExit = useCallback(() => {
    navigation.navigate(routes.APP.AUTH)
  }, [])

  return (
    <Container>
      <Warning>Если не понимаешь что происходит - выходи (срочно!)</Warning>

      <Input
        returnKeyType="send"
        defaultValue={password}
        value={value}
        onChangeText={setValue}
        secureTextEntry
        onSubmitEditing={handleSubmit}
        clearButtonMode="while-editing"
      />

      <Button title="Отправить" onPress={handleSubmit} />

      <Button title="Выход" onPress={handleExit} />
    </Container>
  )
}

export default Login
