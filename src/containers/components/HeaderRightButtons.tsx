import L from 'lodash'
import React from 'react'
import { withNavigation, NavigationInjectedProps } from 'react-navigation'
import { graphql, DataProps } from '@apollo/react-hoc'
import Icon from 'react-native-vector-icons/Ionicons'
import {
  Item,
  HeaderButton,
  HeaderButtons,
} from 'react-navigation-header-buttons'
import gql from 'graphql-tag'
import { ROUTES } from 'src/navigation'
import { HeaderSettings } from 'src/apollo'
import { withTheme, ITheme } from 'src/styled-components'
import { storage } from 'src/utils'

const IoniconsHeaderButton = (passMeFurther: any) => (
  <HeaderButton {...passMeFurther} IconComponent={Icon} />
)

interface Props
  extends NavigationInjectedProps,
    DataProps<{
      headerSettings: HeaderSettings
    }> {
  theme: ITheme
}

class HeaderRightButtons extends React.PureComponent<Props> {
  private navigateToProfile = (): void => {
    const { navigation } = this.props
    navigation.navigate(ROUTES.MAIN.PROFILE)
  }

  private navigateToSettings = (): void => {
    const { navigation } = this.props
    navigation.navigate(ROUTES.MAIN.SETTINGS)
  }

  private logout = async (): Promise<void> => {
    const { navigation } = this.props
    // FIXME: временно, пока не сделаю логаут в другом месте
    // и через бэк
    await storage.clearStorage()
    navigation.navigate(ROUTES.AUTH.LOGIN)
  }

  private getColor = (): string => {
    const {
      theme,
      data: { headerSettings },
    } = this.props
    const mode = L.get(headerSettings, 'mode', 'dark')
    return mode === 'dark' ? theme.colors.black : theme.colors.white
  }

  iconSize = 23
  private renderRightIcon = (): JSX.Element => {
    const {
      data: { headerSettings },
    } = this.props
    const state = L.get(headerSettings, 'state', 'main')
    const color = this.getColor()
    return state === 'main' ? (
      <Item
        color={color}
        iconSize={this.iconSize}
        title="Профиль"
        iconName="md-contact"
        onPress={this.navigateToProfile}
      />
    ) : (
      <Item
        color={color}
        iconSize={this.iconSize}
        title="Настройки"
        iconName="md-cog"
        onPress={this.navigateToSettings}
      />
    )
  }

  render() {
    const color = this.getColor()
    return (
      <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
        <Item
          color={color}
          iconSize={this.iconSize}
          title="Выход"
          iconName="md-log-out"
          onPress={this.logout}
        />
        <Item
          color={color}
          iconSize={this.iconSize}
          title="Уведомления"
          iconName="md-notifications-outline"
        />
        {this.renderRightIcon()}
      </HeaderButtons>
    )
  }
}

const GET_HEADER_SETTINGS = gql`
  query {
    headerSettings @client {
      mode
      state
    }
  }
`

export default L.flowRight(
  graphql(GET_HEADER_SETTINGS),
  withNavigation,
  withTheme,
)(HeaderRightButtons)
