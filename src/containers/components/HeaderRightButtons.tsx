import L from 'lodash'
import React, { useCallback } from 'react'
import { withNavigation, NavigationInjectedProps } from 'react-navigation'
import { useQuery } from '@apollo/react-hooks'
import Icon from 'react-native-vector-icons/Ionicons'
import {
  Item,
  HeaderButton,
  HeaderButtons,
} from 'react-navigation-header-buttons'
import gql from 'graphql-tag'
import { routes } from 'src/constants'
import { HeaderSettings } from 'src/apollo'
import { withTheme, ITheme } from 'src/styled-components'

const IoniconsHeaderButton = (passMeFurther: any) => (
  <HeaderButton {...passMeFurther} IconComponent={Icon} />
)

const ICON_SIZE = 23

const GET_HEADER_SETTINGS = gql`
  query {
    headerSettings @client {
      mode
      state
    }
  }
`

interface Props extends NavigationInjectedProps {
  theme: ITheme
}

const HeaderRightButtons: React.FC<Props> = ({ navigation, theme }) => {
  const navigateToProfile = useCallback((): void => {
    navigation.navigate(routes.MAIN.PROFILE)
  }, [])

  const navigateToSettings = useCallback((): void => {
    navigation.navigate(routes.MAIN.SETTINGS)
  }, [])

  const { data } = useQuery<{ headerSettings: HeaderSettings }>(
    GET_HEADER_SETTINGS,
  )
  const mode = L.get(data, 'headerSettings.mode', 'dark')
  const state = L.get(data, 'headerSettings.state', 'main')
  const color = mode === 'dark' ? theme.colors.black : theme.colors.white

  return (
    <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
      {state === 'main' ? (
        <Item
          color={color}
          iconSize={ICON_SIZE}
          title="Профиль"
          iconName="md-contact"
          onPress={navigateToProfile}
        />
      ) : (
        <Item
          color={color}
          iconSize={ICON_SIZE}
          title="Настройки"
          iconName="md-cog"
          onPress={navigateToSettings}
        />
      )}
    </HeaderButtons>
  )
}

export default L.flowRight(
  withNavigation,
  withTheme,
)(HeaderRightButtons)
