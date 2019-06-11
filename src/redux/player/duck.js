import { handleActions } from 'redux-actions'

/* #region Action Types */

const player = handleActions(
  {},
  {
    currentPlaylist: '',
    tracks: [],
    currentTrack: '',
    currentTime: 0,
    isMixEnable: false,
  },
)

/* #endregion */

export default player
