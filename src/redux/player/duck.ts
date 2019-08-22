import { names } from '../../constants'
import { createAction, handleActions } from 'redux-actions'
import { getModuleActionName } from '../../utils/helpers'

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
export const updatedPlayerQueue = createAction(UPDATED_PLAYER_QUEUE)
export const playWithNewTracks = createAction(PLAY_WITH_NEW_TRACKS)
export const trackPlayerStateChanged = createAction(TRACK_PLAYER_STATE_CHANGED)
export const trackPlayerTrackChanged = createAction(TRACK_PLAYER_TRACK_CHANGED)
export const moveTrackInQueue = createAction(MOVE_TRACK_IN_QUEUE)
export const playingStarted = createAction(PLAYING_STARTED)
export const playingStopped = createAction(PLAYING_STOPPED)
export const error = createAction(ERROR)

/* #endregion */

/* #region reducers */

const player = handleActions(
  {
    [TRACK_PLAYER_STATE_CHANGED]: (state, { payload }) => ({
      ...state,
      playerState: payload,
    }),
    [TRACK_PLAYER_TRACK_CHANGED]: (state, { payload }) => ({
      ...state,
      currentTrackId: payload,
    }),
    [UPDATED_PLAYER_QUEUE]: (
      state,
      { payload: { queue, currentAlbumId, currentTrackId } },
    ) => ({
      ...state,
      queue,
      currentTrackId,
      currentAlbumId,
    }),
  },
  {
    playerState: names.PLAYER_STATES.NONE,
    currentAlbumId: '',
    currentTrackId: '',
    queue: [],
    isMixEnable: false,
  },
)

/* #endregion */

export default player
