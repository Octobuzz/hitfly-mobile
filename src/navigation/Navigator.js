import { Navigation } from 'react-native-navigation'
import { Platform } from 'react-native'

import * as screens from './screens'
import { colors, images, style } from '../constants'
import {
  // NAV_BAR_BUTTON_ARROW_BACK_WHITE,
  // NAV_BAR_BUTTON_ARROW_BACK_BLACK,
  // NAV_BAR_BUTTON_SHEVRON_DOWN_WHITE,
  // NAV_BAR_BUTTON_SETTINGS_WHITE,
  NAV_BAR_BUTTON_USER_AVATAR,
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
    icon: images.NAVBAR_BACK_ARROW_WHITE,
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

const topBarTitle = (title = '') => {
  return {
    title: {
      // color: colors.BRAND_BLUE,
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
                  ...BOTTOM_TAB_STYLE,
                  text: 'Главное',
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
                        ...topBarTitle('Подборки'),
                      },
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  ...BOTTOM_TAB_STYLE,
                  text: 'Подборки',
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
                        ...topBarTitle('Радиостанция'),
                      },
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  ...BOTTOM_TAB_STYLE,
                  text: 'Радиостанция',
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
                        ...topBarTitle('Блог'),
                      },
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  ...BOTTOM_TAB_STYLE,
                  text: 'Блог',
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
                        ...topBarTitle('Поиск'),
                      },
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  ...BOTTOM_TAB_STYLE,
                  text: 'Поиск',
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

export default {
  startSplashScreen,
  startAuthScreen,
  startTabBasedApp,
}
