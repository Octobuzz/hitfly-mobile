import { Navigation } from 'react-native-navigation'

import * as screens from './screens'
import { colors, images } from '../constants'
import style from '../style'
import {
  // NAV_BAR_BUTTON_ARROW_BACK_WHITE,
  // NAV_BAR_BUTTON_ARROW_BACK_BLACK,
  // NAV_BAR_BUTTON_SHEVRON_DOWN_WHITE,
  // NAV_BAR_BUTTON_SETTINGS_WHITE,
  NAV_BAR_BUTTON_USER_AVATAR,
} from '../screens/NavBarButton'

const BOTTOM_TABS_STYLE = {
  visible: true,
  animate: true,
  currentTabIndex: 0,
  // currentTabId: 'currentTabId',
  // testID: 'bottomTabsTestID',
  drawBehind: false,
  backgroundColor: 'white',
  // ios
  barStyle: 'default',
  translucent: true,
  hideShadow: true,
  // android
  elevation: 0,
  titleDisplayMode: 'alwaysShow',
}

const BOTTOM_TAB_STYLE = {
  textColor: colors.GRAY_LABEL,
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

const topBarTitle = (title = '') => {
  return {
    title: {
      color: colors.BRAND_BLUE,
      text: '',
      alignment: 'fill',
      component: {
        name: screens.NAV_BAR_TITLE.screen,
        alignment: 'fill',
        passProps: {
          title,
        },
      },
    },
  }
}

const navBarButton = type => {
  return {
    id: `${type}_id`,
    component: {
      name: screens.NAV_BAR_BUTTON.screen,
      alignment: 'fill',
      passProps: {
        type,
      },
    },
  }
}

const startSplashScreen = () => {
  Navigation.setDefaultOptions({
    statusBar: {
      visible: true,
      style: 'dark',
      // backgroundColor: colors.WHITE, android
    },
    topBar: {
      background: {
        // color: colors.TRANSPARENT,
        color: colors.BLACK,
      },
      ...topBarTitle(''),
      backButton: {
        title: '',
        color: 'white',
      },
      buttonColor: 'white',
    },
    layout: {
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
                statusBar: {
                  style: 'dark',
                },
              },
            },
          },
        ],
      },
    },
  })
}

const startLoginScreen = () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: screens.LOGIN.screen,
              options: {
                topBar: {
                  ...topBarTitle('Вход'),
                  leftButtons: [
                    // navBarButton(NAV_BAR_BUTTON_ARROW_BACK_WHITE),
                    // navBarButton(NAV_BAR_BUTTON_SHEVRON_DOWN_WHITE),
                  ],
                  rightButtons: [
                    // navBarButton(NAV_BAR_BUTTON_SETTINGS_WHITE),
                    navBarButton(NAV_BAR_BUTTON_USER_AVATAR),
                  ],
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
                        ...topBarTitle('Главное'),
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
                  text: 'Главное',
                  icon: images.TAB_HOME,
                  selectedIcon: images.TAB_HOME_SELECTED,
                  testID: screens.TAB_HOME.screen,
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
                        ...topBarTitle('Подборки'),
                      },
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  text: 'Подборки',
                  icon: images.TAB_SELECTIONS,
                  selectedIcon: images.TAB_SELECTIONS_SELECTED,
                  testID: screens.TAB_SELECTIONS.screen,
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
                        ...topBarTitle('Радиостанция'),
                      },
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  text: 'Радиостанция',
                  icon: images.TAB_RADIO,
                  selectedIcon: images.TAB_RADIO_SELECTED,
                  testID: screens.TAB_RADIO.screen,
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
                        ...topBarTitle('Блог'),
                      },
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  text: 'Блог',
                  icon: images.TAB_BLOG,
                  selectedIcon: images.TAB_BLOG_SELECTED,
                  testID: screens.TAB_BLOG.screen,
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
                        ...topBarTitle('Поиск'),
                      },
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  text: 'Поиск',
                  icon: images.TAB_SEARCH,
                  selectedIcon: images.TAB_SEARCH_SELECTED,
                  testID: screens.TAB_SEARCH.screen,
                },
              },
            },
          },
        ],
      },
    },
  })
}

export default {
  startSplashScreen,
  startLoginScreen,
  startTabBasedApp,
}
