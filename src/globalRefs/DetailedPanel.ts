import { createRef } from 'react'
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout'

const detaledPanelRef = createRef<DrawerLayout>()

function showPanel() {
  if (detaledPanelRef.current) {
    detaledPanelRef.current.openDrawer()
  }
}

function hidePanel() {
  if (detaledPanelRef.current) {
    detaledPanelRef.current.closeDrawer()
  }
}

export default { detaledPanelRef, showPanel, hidePanel }
