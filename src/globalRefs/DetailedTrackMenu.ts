import { createRef } from 'react'
import Modal from 'src/components/Modal'

const ref = createRef<Modal>()
let isModalShown = false

function isShown() {
  return isModalShown
}

function show() {
  if (ref.current) {
    ref.current.show()
    isModalShown = true
  }
}

function hide() {
  if (ref.current) {
    ref.current.hide()
    isModalShown = false
  }
}

export default { ref, show, hide, isShown }
