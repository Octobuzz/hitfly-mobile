import AuthErrorPanel from 'src/components/Panels/AuthErrorPanel'

let authPanelRef: AuthErrorPanel

function setPanel(ref: AuthErrorPanel) {
  authPanelRef = ref
}

function showPanel() {
  if (authPanelRef) {
    authPanelRef.showPanel()
  }
}

function hidePanel() {
  if (authPanelRef) {
    authPanelRef.hidePanel()
  }
}

export default { setPanel, showPanel, hidePanel }
