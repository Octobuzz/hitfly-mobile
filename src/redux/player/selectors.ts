import R from 'ramda'
import { createSelector } from 'reselect'
import { Player } from './duck'

const getState: (state: any) => Player = R.prop('player')

const getPlayerState = R.pipe(
  getState,
  R.prop('playerState'),
)

const getCurrentAlbumId = R.pipe(
  getState,
  R.prop('currentAlbumId'),
)

const getQueue = R.pipe(
  getState,
  R.prop('queue'),
)

const getCurrentTrackId = R.pipe(
  getState,
  R.prop('currentTrackId'),
)

const getIsMixEnable = R.pipe(
  getState,
  R.prop('isMixEnable'),
)

const getCurrentTrackInfo = createSelector(
  [getCurrentTrackId, getQueue],
  (trackId, queue) => R.find(R.propEq('id', trackId), queue),
)

export default {
  getPlayerState,
  getCurrentAlbumId,
  getCurrentTrackId,
  getCurrentTrackInfo,
  getQueue,
  getIsMixEnable,
}
