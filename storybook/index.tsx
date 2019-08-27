import React from 'react'
import { AppRegistry } from 'react-native'
import { getStorybookUI, configure } from '@storybook/react-native'
import { SafeAreaView } from 'react-native'

// import stories
configure(() => {
  require('./stories.tsx')
}, module)

// Refer to https://github.com/storybooks/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({
  onDeviceUI: true,
  disableWebsockets: true,
  tabOpen: -1,
})

export default () => (
  // eslint-disable-next-line react-native/no-inline-styles
  <SafeAreaView style={{ flex: 1 }}>
    <StorybookUIRoot />
  </SafeAreaView>
)
