import R from 'ramda'
import { all, call } from 'redux-saga/effects'
import { combineReducers, applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'

import profileReducer, { profileSagas } from './profile'
import playerReducer, { playerSagas } from './player'
import tempMusicReducer from './tempMusic'

const rootReducer = combineReducers({
  profile: profileReducer,
  player: playerReducer,
  tempMusic: tempMusicReducer,
})

function* rootSaga() {
  yield all([call(profileSagas), call(playerSagas)])
}

export const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware()

  const middlewares = R.filter(R.complement(R.isNil), [
    sagaMiddleware,
    __DEV__ ? createLogger({ collapsed: true }) : null,
  ])

  const store = createStore(rootReducer, applyMiddleware(...middlewares))

  sagaMiddleware.run(rootSaga)

  return store
}
