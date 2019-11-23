import {
  NavigationActions,
  NavigationContainerComponent,
  NavigationNavigateActionPayload,
} from 'react-navigation'

let navigator: NavigationContainerComponent

// TODO: не вижу необходимости в этом сервисе
function setTopLevelNavigator(navigatorRef: NavigationContainerComponent) {
  navigator = navigatorRef
}

function navigate(options: NavigationNavigateActionPayload) {
  if (navigator) {
    navigator.dispatch(NavigationActions.navigate(options))
  }
}

function goBack() {
  navigator.dispatch(NavigationActions.back())
}

export default {
  goBack,
  navigate,
  setTopLevelNavigator,
}
