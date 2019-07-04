import { takeLatest, all, put, call, select } from 'redux-saga/effects'
import TrackPlayer from 'react-native-track-player'
import {
  INIT_PLAYER_QUEUE,
  PLAY_WITH_NEW_TRACKS,
  MOVE_TRACK_IN_QUEUE,
  updatedPlayerQueue,
  trackPlayerStateChanged,
  error,
} from './duck'
import playerSelectors from './selectors'

// function* playSaga() {
//   yield put(play())
// }

function* updateQueueAndPlay({
  albumId = 0,
  tracks = [],
  skipId = '',
  startPlaying = false,
}) {
  try {
    yield call(TrackPlayer.reset)
    if (tracks.length) {
      yield call(TrackPlayer.add, tracks)
      if (skipId) yield call(TrackPlayer.skip, skipId)
      if (startPlaying) yield call(TrackPlayer.play)
    }
    yield put(
      updatedPlayerQueue({
        queue: tracks,
        currentTrackId: skipId ? skipId : tracks[0].id,
        currentAlbumId: albumId,
      }),
    )
  } catch (e) {
    yield put(error({ error: e }))
  }
}

function* initPlayerQueueSaga({
  payload: { albumId = 0, tracks = [], skipId = '' } = {},
}) {
  const initAlbumId = albumId
    ? albumId
    : yield select(playerSelectors.getCurrentAlbumId)
  const initQueue =
    tracks && tracks.length
      ? tracks
      : yield select(playerSelectors.getQueue) || []
  const initSkipId = skipId
    ? skipId
    : yield select(playerSelectors.getCurrentTrackId) || ''

  try {
    const playerState = yield call(TrackPlayer.getState)
    yield put(trackPlayerStateChanged(playerState))
    yield call(updateQueueAndPlay, {
      albumId: initAlbumId,
      tracks: initQueue,
      skipId: initSkipId,
      startPlaying: false,
    })
  } catch (e) {
    yield put(error({ error: e }))
  }
}

function* playWithNewTracksSaga({ payload: { albumId, tracks, skipId } }) {
  yield call(updateQueueAndPlay, {
    albumId,
    tracks,
    skipId,
    startPlaying: true,
  })
}

function* moveTrackInQueueSaga({ payload: { from = 0, to = 0 } }) {
  try {
    const queue = yield select(playerSelectors.getQueue)
    const playingTrackId = yield select(playerSelectors.getCurrentTrackId)
    const playingAlbumId = yield select(playerSelectors.getCurrentAlbumId)
    const playingTrackIndex = queue.findIndex(({ id }) => id === playingTrackId)
    const movedTrack = queue[from]
    if (playingTrackIndex !== from) {
      yield call(TrackPlayer.remove, movedTrack.id)
      if (to === queue.length - 1) {
        yield call(TrackPlayer.add, movedTrack)
      } else {
        const beforeId = queue[to > from ? to + 1 : to].id
        yield call(TrackPlayer.add, movedTrack, beforeId)
      }
    } else {
      if (from < to) {
        const movedTrackIds = queue
          .filter((item, index) => index > from && index <= to)
          .map(({ id }) => id)
        const movedTracks = movedTrackIds.map(trackId =>
          queue.find(({ id }) => id === trackId),
        )

        // FIXME: если передавать массив - то удаляет почему-то не все элементы
        // yield call(TrackPlayer.remove, movedTrackIds)
        for (let i = 0; i < movedTrackIds.length; i++) {
          yield call(TrackPlayer.remove, movedTrackIds[i])
        }
        yield call(TrackPlayer.add, movedTracks, playingTrackId)
      } else {
        const movedTrackIds = queue
          .filter((item, index) => index >= to && index < from)
          .map(({ id }) => id)
        const movedTracks = movedTrackIds.map(trackId =>
          queue.find(({ id }) => id === trackId),
        )
        // FIXME: если передавать массив - то удаляет почему-то не все элементы
        // yield call(TrackPlayer.remove, movedTrackIds)
        for (let i = 0; i < movedTrackIds.length; i++) {
          yield call(TrackPlayer.remove, movedTrackIds[i])
        }
        if (playingTrackIndex === queue.length) {
          yield call(TrackPlayer.add, movedTracks)
        } else {
          const beforeId = queue[playingTrackIndex + 1].id
          yield call(TrackPlayer.add, movedTracks, beforeId)
        }
      }
    }
    const tpQueue = yield call(TrackPlayer.getQueue)
    const newQueue = tpQueue.map(({ id }) =>
      queue.find(({ id: findId }) => id === findId),
    )
    yield put(
      updatedPlayerQueue({
        queue: newQueue,
        currentTrackId: playingTrackId,
        currentAlbumId: playingAlbumId,
      }),
    )
  } catch (e) {
    // console.log('error: ', e)
  }
}

export default function*() {
  yield all([
    // takeLatest(PLAY, playSaga),
    // takeLatest(PAUSE, pauseSaga),
    takeLatest(INIT_PLAYER_QUEUE, initPlayerQueueSaga),
    takeLatest(PLAY_WITH_NEW_TRACKS, playWithNewTracksSaga),
    takeLatest(MOVE_TRACK_IN_QUEUE, moveTrackInQueueSaga),
  ])
}
