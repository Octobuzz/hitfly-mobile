import { createStackNavigator } from 'react-navigation-stack'
import { ModalPlayerScreen, ModalPlaylistScreen } from 'src/screens'
import { routes } from 'src/constants'

const PlayerNavigator = createStackNavigator(
  {
    [routes.PLAYER.MODAL_PLAYER]: {
      screen: ModalPlayerScreen,
    },
    [routes.PLAYER.MODAL_PLAYLIST]: {
      screen: ModalPlaylistScreen,
    },
  },
  {
    initialRouteName: routes.PLAYER.MODAL_PLAYER,
    defaultNavigationOptions: {
      headerTransparent: true,
    },
  },
)

export default PlayerNavigator
