import { createStackNavigator } from 'react-navigation-stack'
import { HomeScreen, CollectionDetailsScreen } from 'src/screens'
import { PlaylistScreen, Top50PlaylistScreen } from 'src/containers'
import { stackConfig, playlistConfig } from './configs'
import routeNames from './routeNames'

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
    [routeNames.MAIN.COLLECTION_PLAYLIST]: {
      screen: PlaylistScreen,
      navigationOptions: ({ navigation }) => {
        const title = navigation.getParam('title')
        return {
          title,
          ...playlistConfig,
        }
      },
    },
    [routeNames.MAIN.TOP_50_PLAYLIST]: {
      screen: Top50PlaylistScreen,
      navigationOptions: {
        title: 'Топ 50',
        ...playlistConfig,
      },
    },
  },
  {
    initialRouteName: routeNames.MAIN.HOME,
    headerMode: 'screen',
    ...stackConfig,
  },
)

export default MainNavigator
