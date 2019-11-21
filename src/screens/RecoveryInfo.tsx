import React from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { View, Link, HelperText, Stretcher, SafeView } from 'src/components'
import { routes } from 'src/constants'
import styled from 'src/styled-components'

const BoldHelperText = styled(HelperText)`
  font-family: ${({ theme }) => theme.fonts.bold};
`

class RecoveryInfo extends React.Component<NavigationStackScreenProps> {
  private navigateToLogin = (): void => {
    const { navigation } = this.props
    navigation.navigate(routes.AUTH.LOGIN)
  }

  render() {
    const { navigation } = this.props
    const email = navigation.getParam('email')
    return (
      <SafeView>
        <View>
          <HelperText>На почту</HelperText>
          <BoldHelperText>{email}</BoldHelperText>
          <HelperText>
            должно прийти письмо с инструкциями по установке нового пароля
          </HelperText>
          <Stretcher />
          <Link onPress={this.navigateToLogin} title="Вернуться ко входу" />
        </View>
      </SafeView>
    )
  }
}

export default RecoveryInfo
