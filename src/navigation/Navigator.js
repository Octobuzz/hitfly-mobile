// import R from 'ramda'
import { Navigation } from 'react-native-navigation'
import { Platform } from 'react-native'

import * as screens from './screens'
import { colors, images, style } from '../constants'
import { helpers } from '../utils'
import {
  // NAV_BAR_BUTTON_ARROW_BACK_WHITE,
  NAV_BAR_BUTTON_ARROW_BACK_BLACK,
  // NAV_BAR_BUTTON_SHEVRON_DOWN_WHITE,
  // NAV_BAR_BUTTON_SETTINGS_WHITE,
  NAV_BAR_BUTTON_USER_AVATAR,
  // NAV_BAR_BUTTON_ANDROID_OFFSET,
} from '../screens/NavBarButton'

const STATUS_BAR_STYLE = {
  style: 'light', // | 'dark',
  // ios
  hideWithTopBar: false,
  blur: true,
  // android
  backgroundColor: colors.BLACK,
  drawBehind: false,
  visible: true,
}

const TOP_BAR_STYLE = {
  visible: true,
  animate: false,
  hideOnScroll: false,
  // buttonColor: colors.BLACK,
  drawBehind: false,
  backButton: {
    title: '',
    visible: false,
  },
  background: {
    color: colors.WHITE,
  },
  // ios
  noBorder: true,
  // searchBar: false,
  // android
  height: 60, // TopBar height in dp
  // borderColor: colors.WHITE,
  borderHeight: 0,
  elevation: 0, // TopBar elevation in dp
  topMargin: 0, // top margin in dp
}

const BOTTOM_TABS_STYLE = {
  visible: true,
  animate: false,
  // currentTabIndex: 0,
  // currentTabId: 'currentTabId',
  // testID: 'bottomTabsTestID',
  drawBehind: false,
  backgroundColor: colors.WHITE,
  // ios
  barStyle: 'default',
  translucent: true,
  hideShadow: true,
  // android
  elevation: 0,
  titleDisplayMode: 'alwaysShow',
}

const BOTTOM_TAB_STYLE = {
  ...Platform.select({
    android: {
      iconColor: colors.EXTRA_GRAY_LABEL,
      selectedIconColor: colors.BLACK_LABEL,
    },
  }),
  textColor: colors.EXTRA_GRAY_LABEL,
  selectedTextColor: colors.BLACK_LABEL,
  fontFamily: style.text.regular.fontFamily,
  fontSize: 8,
  // ios
  iconInsets: { top: 0, left: 0, bottom: 0, right: 0 },
  disableIconTint: true,
  disableSelectedIconTint: true,
  // android
  selectedFontSize: 8,
}

const topBarTitle = (title = '', props = {}) => {
  return {
    title: {
      // color: colors.BRAND_BLUE,
      text: '',
      alignment: 'fill',
      component: {
        name: screens.NAV_BAR_TITLE.screen,
        alignment: 'fill',
        passProps: {
          ...props,
          title,
          someProp: 'qq',
        },
      },
    },
  }
}

const navBarButton = (type, props = {}) => {
  return {
    id: `${type}_${helpers.generateUID}`,
    component: {
      name: screens.NAV_BAR_BUTTON.screen,
      alignment: 'fill',
      passProps: {
        type,
        ...props,
      },
    },
  }
}

const startSplashScreen = async () => {
  Navigation.setDefaultOptions({
    statusBar: STATUS_BAR_STYLE,
    topBar: {
      visible: false,
      height: 0,
    },
    layout: {
      backgroundColor: colors.WHITE,
      topMargin: 0,
      orientation: ['portrait'],
    },
    bottomTabs: {
      ...BOTTOM_TABS_STYLE,
    },
    bottomTab: {
      ...BOTTOM_TAB_STYLE,
    },
  })

  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: screens.SPLASH.screen,
              options: {
                topBar: {
                  visible: false,
                },
                statusBar: STATUS_BAR_STYLE,
              },
            },
          },
        ],
      },
    },
  })
}

const startAuthScreen = () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: screens.AUTH.screen,
              options: {
                topBar: {
                  ...TOP_BAR_STYLE,
                  ...topBarTitle('Вход'),
                },
              },
            },
          },
        ],
      },
    },
  })
}

const startTabBasedApp = () => {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [
          {
            stack: {
              children: [
                {
                  component: {
                    name: screens.TAB_HOME.screen,
                    options: {
                      topBar: {
                        ...TOP_BAR_STYLE,
                        ...topBarTitle(screens.TAB_HOME.title),
                        rightButtons: [
                          navBarButton(NAV_BAR_BUTTON_USER_AVATAR),
                        ],
                      },
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  ...BOTTOM_TAB_STYLE,
                  text: screens.TAB_HOME.title,
                  icon: images.TAB_HOME,
                  selectedIcon: images.TAB_HOME_SELECTED,
                  testID: `${screens.TAB_HOME.screen}_id`,
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: screens.TAB_SELECTIONS.screen,
                    options: {
                      topBar: {
                        ...TOP_BAR_STYLE,
                        ...topBarTitle(screens.TAB_SELECTIONS.title),
                      },
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  ...BOTTOM_TAB_STYLE,
                  text: screens.TAB_SELECTIONS.title,
                  icon: images.TAB_SELECTIONS,
                  selectedIcon: images.TAB_SELECTIONS_SELECTED,
                  testID: `${screens.TAB_SELECTIONS.screen}_id`,
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: screens.TAB_RADIO.screen,
                    options: {
                      topBar: {
                        ...TOP_BAR_STYLE,
                        ...topBarTitle(screens.TAB_RADIO.title),
                      },
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  ...BOTTOM_TAB_STYLE,
                  text: screens.TAB_RADIO.title,
                  icon: images.TAB_RADIO,
                  selectedIcon: images.TAB_RADIO_SELECTED,
                  testID: `${screens.TAB_RADIO.screen}_id`,
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: screens.TAB_BLOG.screen,
                    options: {
                      topBar: {
                        ...TOP_BAR_STYLE,
                        ...topBarTitle(screens.TAB_BLOG.title),
                      },
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  ...BOTTOM_TAB_STYLE,
                  text: screens.TAB_BLOG.title,
                  icon: images.TAB_BLOG,
                  selectedIcon: images.TAB_BLOG_SELECTED,
                  testID: `${screens.TAB_BLOG.screen}_id`,
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: screens.TAB_SEARCH.screen,
                    options: {
                      topBar: {
                        ...TOP_BAR_STYLE,
                        ...topBarTitle(screens.TAB_SEARCH.title),
                      },
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  ...BOTTOM_TAB_STYLE,
                  text: screens.TAB_SEARCH.title,
                  icon: images.TAB_SEARCH,
                  selectedIcon: images.TAB_SEARCH_SELECTED,
                  testID: `${screens.TAB_SEARCH.screen}_id`,
                },
              },
            },
          },
        ],
      },
    },
  })
}

const getComponentId = screen => {
  let componentId
  if (typeof screen === 'object') {
    componentId =
      screen.props && screen.props.componentId ? screen.props.componentId : ''
  } else {
    componentId = screen
  }
  return componentId
}

const push = (
  { props: { componentId = '' } },
  screen = {},
  passProps = {},
  navOptions = {},
) => {
  const screenId = `${screen.screen}_${helpers.generateUID}`
  Navigation.push(componentId, {
    component: {
      id: screenId,
      name: screen.screen,
      passProps,
      options: {
        topBar: {
          ...TOP_BAR_STYLE,
          ...Platform.select({
            ios: {
              ...topBarTitle(screen.title || ''),
              leftButtons: [
                navBarButton(NAV_BAR_BUTTON_ARROW_BACK_BLACK, { screenId }),
              ],
            },
            // TODO: фикс для android https://github.com/wix/react-native-navigation/issues/4449
            android: {
              ...topBarTitle(screen.title || '', {
                androidLeftButtons: [
                  {
                    type: NAV_BAR_BUTTON_ARROW_BACK_BLACK,
                  },
                ],
                screenId,
              }),
            },
          }),
          // rightButtons: R.filter(R.complement(R.isNil), [
          //   Platform.OS === 'android' ? navBarButton(NAV_BAR_BUTTON_ANDROID_OFFSET) : null,
          //   navBarButton(NAV_BAR_BUTTON_USER_AVATAR, {screenId}),
          //   navBarButton(NAV_BAR_BUTTON_ARROW_BACK_BLACK, {screenId}),
          // ]),
        },
        bottomTabs: {
          ...BOTTOM_TABS_STYLE,
        },
        bottomTab: {
          ...BOTTOM_TAB_STYLE,
        },
        ...navOptions,
      },
    },
  })
}

const pop = screen => {
  let screenId = getComponentId(screen)
  screenId && Navigation.pop(screenId)
}

const popToRoot = screen => {
  let screenId = getComponentId(screen)
  Navigation.popToRoot(screenId)
}

export default {
  startSplashScreen,
  startAuthScreen,
  startTabBasedApp,
  push,
  pop,
  popToRoot,
}
