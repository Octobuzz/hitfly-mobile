import { createRef } from 'react'
import { SlidingPanelInstance } from 'src/components/SlidingPanel'

const authPanelRef = createRef<SlidingPanelInstance>()

function showPanel() {
  if (authPanelRef.current) {
    authPanelRef.current.show()
  }
}

function hidePanel() {
  if (authPanelRef.current) {
    authPanelRef.current.hide()
  }
}

export default { authPanelRef, showPanel, hidePanel }
