import R from 'ramda'
import { createAction, createReducer } from 'deox'
import { State } from 'react-native-track-player'
import { getModuleActionName } from '../../utils/helpers'
import { names } from '../../constants'
import { statePayloadArr } from '../utils'

/* #region Action Types */

const getActionName = getModuleActionName('player')

export const INIT_PLAYER_QUEUE = getActionName('INIT_PLAYER_QUEUE')
export const UPDATED_PLAYER_QUEUE = getActionName('UPDATED_PLAYER_QUEUE')
export const PLAY_WITH_NEW_TRACKS = getActionName('PLAY_WITH_NEW_TRACKS')
export const TRACK_PLAYER_STATE_CHANGED = getActionName(
  'TRACK_PLAYER_STATE_CHANGED',
)
export const TRACK_PLAYER_TRACK_CHANGED = getActionName(
  'TRACK_PLAYER_TRACK_CHANGED',
)
export const MOVE_TRACK_IN_QUEUE = getActionName('MOVE_TRACK_IN_QUEUE')
export const PLAYING_STARTED = getActionName('PLAYING_STARTED')
export const PLAYING_STOPPED = getActionName('PLAYING_STOPPED')
export const ERROR = getActionName('ERROR')

/* #endregion */

/* #region Action Creators */

export const initPlayerQueue = createAction(INIT_PLAYER_QUEUE)
export const updatedPlayerQueue = createAction(
  UPDATED_PLAYER_QUEUE,
  resolve => (payload: {
    queue: any[]
    currentTrackId: string
    currentAlbumId: string
  }) => resolve(payload),
)
export const playWithNewTracks = createAction(PLAY_WITH_NEW_TRACKS)
export const trackPlayerStateChanged = createAction(
  TRACK_PLAYER_STATE_CHANGED,
  resolve => (playerState: State) => resolve(playerState),
)
export const trackPlayerTrackChanged = createAction(
  TRACK_PLAYER_TRACK_CHANGED,
  resolve => (currentTrackId: string) => resolve(currentTrackId),
)
export const moveTrackInQueue = createAction(MOVE_TRACK_IN_QUEUE)
export const playingStarted = createAction(PLAYING_STARTED)
export const playingStopped = createAction(PLAYING_STOPPED)
export const error = createAction(ERROR)

/* #endregion */

/* #region reducers */

export interface Player {
  playerState: State
  currentAlbumId: string
  currentTrackId: string
  queue: any[]
  isMixEnable: boolean
}

const playerDefaultState: Player = {
  playerState: names.PLAYER_STATES.NONE,
  currentAlbumId: '',
  currentTrackId: '',
  queue: [],
  isMixEnable: false,
}

const player = createReducer(playerDefaultState, handleAction => [
  handleAction(
    trackPlayerStateChanged,
    R.useWith(R.flip(R.assoc('playerState')), statePayloadArr),
  ),
  handleAction(
    trackPlayerTrackChanged,
    R.useWith(R.flip(R.assoc('currentTrackId')), statePayloadArr),
  ),
  handleAction(
    updatedPlayerQueue,
    R.useWith(R.mergeDeepRight, statePayloadArr),
  ),
])

/* #endregion */

export default player
