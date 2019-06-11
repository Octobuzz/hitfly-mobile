import R from 'ramda'

const getState = R.prop('player')

const getCurrentPlaylist = R.pipe(
  getState,
  R.prop('currentPlaylist'),
)

const getTracks = R.pipe(
  getState,
  R.prop('tracks'),
)

const getCurrentTrack = R.pipe(
  getState,
  R.prop('currentTrack'),
)

const getCurrentTime = R.pipe(
  getState,
  R.prop('currentTime'),
)

const getIsMixEnable = R.pipe(
  getState,
  R.prop('isMixEnable'),
)

export default {
  getCurrentPlaylist,
  getTracks,
  getCurrentTrack,
  getCurrentTime,
  getIsMixEnable,
}
