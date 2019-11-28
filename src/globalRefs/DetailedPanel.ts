import { createRef } from 'react'
import { SlidingPanelInstance } from 'src/components/SlidingPanel'

const detaledPanelRef = createRef<SlidingPanelInstance>()

function showPanel() {
  if (detaledPanelRef.current) {
    detaledPanelRef.current.show()
  }
}

function hidePanel() {
  if (detaledPanelRef.current) {
    detaledPanelRef.current.hide()
  }
}

export default { detaledPanelRef, showPanel, hidePanel }
