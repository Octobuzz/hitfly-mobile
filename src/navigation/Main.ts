import { createStackNavigator } from 'react-navigation-stack'
import { HomeScreen, CollectionDetailsScreen } from 'src/screens'
import routeNames from './routeNames'
import { stackConfig } from './configs'

const MainNavigator = createStackNavigator(
  {
    [routeNames.MAIN.HOME]: {
      screen: HomeScreen,
      navigationOptions: { headerTitle: 'Главное' },
    },
    [routeNames.MAIN.COLLECTION_DETAILS]: {
      screen: CollectionDetailsScreen,
      navigationOptions: ({ navigation }) => {
        const title = navigation.getParam('title')
        return {
          title,
        }
      },
    },
  },
  {
    initialRouteName: routeNames.MAIN.HOME,
    ...stackConfig,
  },
)

export default MainNavigator
