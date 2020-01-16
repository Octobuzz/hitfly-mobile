import DetailedTrackMenuRef from './DetailedTrackMenu'
import { delay } from 'src/helpers'

// дефолт библиотеки 300 + 300, + 50 на всякий случай
const MODAL_TRANSITION = 650

export const closeOpenedModalsForAuthModal = async () => {
  if (DetailedTrackMenuRef.isShown()) {
    DetailedTrackMenuRef.hide() // на случай если открыта эта модалка
    await delay(MODAL_TRANSITION)
  }
}
