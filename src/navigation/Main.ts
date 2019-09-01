import { createStackNavigator } from 'react-navigation'
import { HomeScreen } from 'src/screens'
import routeNames from './routeNames'
import { stackConfig } from './configs'

const MainNavigator = createStackNavigator(
  {
    [routeNames.MAIN.HOME]: {
      screen: HomeScreen,
      navigationOptions: { headerTitle: 'Главное' },
    },
  },
  {
    initialRouteName: routeNames.MAIN.HOME,
    ...stackConfig,
  },
)

export default MainNavigator
