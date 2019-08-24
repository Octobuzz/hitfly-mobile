import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { all, call } from 'redux-saga/effects'
import './reactotron.config'

import playerReducer, { playerSagas } from './player'
import profileReducer, { profileSagas } from './profile'

const rootReducer = combineReducers({
  profile: profileReducer,
  player: playerReducer,
})

function* rootSaga() {
  yield all([call(profileSagas), call(playerSagas)])
}

declare global {
  interface Console {
    tron: any
  }
}

export const configureStore = () => {
  const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor })

  const enhancers = [applyMiddleware(sagaMiddleware)]

  if (__DEV__) {
    enhancers.push(console.tron.createEnhancer())
  }

  const store = createStore(rootReducer, compose(...enhancers))

  sagaMiddleware.run(rootSaga)

  return store
}
