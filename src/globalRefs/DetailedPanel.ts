import { Track } from 'src/apollo'
import { DetailedTrackPanel } from 'src/components'

let panelRef: DetailedTrackPanel

function setPanel(ref: DetailedTrackPanel) {
  panelRef = ref
}

function showPanel(track: Track) {
  if (panelRef) {
    panelRef.showDetailedTrack(track)
  }
}

function hidePanel() {
  if (panelRef) {
    panelRef.hidePanel()
  }
}

export default { setPanel, showPanel, hidePanel }
