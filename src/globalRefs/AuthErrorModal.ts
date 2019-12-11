import { createRef } from 'react'
import Modal from 'src/components/Modal'

const ref = createRef<Modal>()

function show() {
  if (ref.current) {
    ref.current.show()
  }
}

function hide() {
  if (ref.current) {
    ref.current.hide()
  }
}

export default { ref, show, hide }
