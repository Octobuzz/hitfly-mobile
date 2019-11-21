import { createRef } from 'react'
import { SlidingPanelInstance } from 'src/components/SlidingPanel'

const logoutPanelRef = createRef<SlidingPanelInstance>()

function showPanel() {
  if (logoutPanelRef.current) {
    logoutPanelRef.current.show()
  }
}

function hidePanel() {
  if (logoutPanelRef.current) {
    logoutPanelRef.current.hide()
  }
}

export default { logoutPanelRef, showPanel, hidePanel }
