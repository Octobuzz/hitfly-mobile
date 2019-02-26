import React from 'react'
import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'

import NavBarButton from '../screens/NavBarButton'
import NavBarTitle from '../screens/NavBarTitle'
import Splash from '../screens/Splash'
import Auth from '../screens/Auth'
import TabHome from '../screens/TabHome'
import TabSelections from '../screens/TabSelections'
import TabRadio from '../screens/TabRadio'
import TabBlog from '../screens/TabBlog'
import TabSearch from '../screens/TabSearch'

import * as screens from './screens'

import { configureStore } from '../redux'

const store = configureStore()

function WrappedComponent(Component) {
  return function inject(props) {
    const EnhancedComponent = () => (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    )

    return <EnhancedComponent />
  }
}

export default function() {
  Navigation.registerComponent(screens.NAV_BAR_BUTTON.screen, () =>
    WrappedComponent(NavBarButton),
  )
  Navigation.registerComponent(screens.NAV_BAR_TITLE.screen, () =>
    WrappedComponent(NavBarTitle),
  )
  Navigation.registerComponent(screens.SPLASH.screen, () =>
    WrappedComponent(Splash),
  )
  Navigation.registerComponent(screens.AUTH.screen, () =>
    WrappedComponent(Auth),
  )
  Navigation.registerComponent(screens.TAB_HOME.screen, () =>
    WrappedComponent(TabHome),
  )
  Navigation.registerComponent(screens.TAB_SELECTIONS.screen, () =>
    WrappedComponent(TabSelections),
  )
  Navigation.registerComponent(screens.TAB_RADIO.screen, () =>
    WrappedComponent(TabRadio),
  )
  Navigation.registerComponent(screens.TAB_BLOG.screen, () =>
    WrappedComponent(TabBlog),
  )
  Navigation.registerComponent(screens.TAB_SEARCH.screen, () =>
    WrappedComponent(TabSearch),
  )
}
