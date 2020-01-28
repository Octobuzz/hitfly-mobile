import React, { useState, useCallback, useEffect } from 'react'
import { Linking } from 'react-native'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { Wrapper, Button, Input, TextBase } from './Components'
import { storage } from 'src/apollo'
import { storageKeys, names, routes } from 'src/constants'
import styled from 'src/styled-components'

const DescriptionText = styled(TextBase)`
  margin-bottom: 4px;
  font-size: 12px;
  font-weight: 300;
`

interface Props extends NavigationStackScreenProps {}

const Main: React.FC<Props> = ({ navigation }) => {
  const [serverDomain, setDomain] = useState<string>('')

  useEffect(() => {
    storage
      .getItem<string>(storageKeys.BASE_URL, names.BASE_URL)
      // @ts-ignore
      .then(setDomain)
  }, [])

  const handleSave = useCallback(async () => {
    const canOpen = await Linking.canOpenURL(serverDomain)
    if (canOpen) {
      storage.setItem(storageKeys.BASE_URL, serverDomain)
    }
  }, [serverDomain])

  const handleReset = useCallback(() => {
    setDomain(names.DOMAIN_URL)
    storage.setItem(storageKeys.BASE_URL, names.BASE_URL)
  }, [])

  const handleExit = useCallback(() => {
    navigation.navigate(routes.APP.AUTH)
  }, [])

  return (
    <Wrapper>
      <DescriptionText>
        URL, который будет использоваться как основной для запросов graphql
      </DescriptionText>
      <Input value={serverDomain} onChangeText={setDomain} />

      <Button title="Сохранить" onPress={handleSave} />
      <Button title="Сбросить" onPress={handleReset} />
      <Button title="Выйти" onPress={handleExit} />
    </Wrapper>
  )
}

export default Main
