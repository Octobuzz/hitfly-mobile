import React from 'react'
import { Linking, Alert } from 'react-native'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { View, HelperText, Stretcher, Button, Link } from 'src/components'
import { DOMAIN_URL } from 'src/constants/names'
import styled from 'src/styled-components'

const IndentedButton = styled(Button)`
  margin-bottom: 24px;
`

interface Props extends NavigationStackScreenProps {}

class RemoveAccount extends React.Component<Props> {
  private navigateToRemoveAccount = async (): Promise<void> => {
    const url = this.getRemoveAccountUrl()
    try {
      await Linking.openURL(url)
    } catch {
      Alert.alert('Ошибка', `Не удалось открыть ссылку ${url}`)
    }
  }

  private goBack = (): void => {
    const { navigation } = this.props
    navigation.goBack()
  }

  private getRemoveAccountUrl = (): string => {
    return `${DOMAIN_URL}profile/edit`
  }

  render() {
    return (
      <View addBottomSafePadding>
        <HelperText>Вы уверены что хотите удалить аккаунт?</HelperText>
        <Stretcher />
        <IndentedButton
          onPress={this.navigateToRemoveAccount}
          title="Удалить аккаунт"
        />
        <Link onPress={this.goBack} title="Отмена" />
      </View>
    )
  }
}

export default RemoveAccount
