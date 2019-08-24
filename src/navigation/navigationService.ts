import { NavigationActions, StackActions } from 'react-navigation'

let navigator

function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef
}

function navigate(routeName, params, action) {
  if (navigator) {
    navigator.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
        action,
      }),
    )
  }
}

function goBack() {
  navigator.dispatch(NavigationActions.back())
}

function reset(index, ...routes) {
  navigator.dispatch(
    StackActions.reset({
      index,
      actions: routes.map(value => NavigationActions.navigate(value)),
    }),
  )
}

export default {
  reset,
  goBack,
  navigate,
  setTopLevelNavigator,
}
