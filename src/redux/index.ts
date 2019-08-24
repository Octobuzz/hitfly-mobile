import { all, call } from 'redux-saga/effects'
import { combineReducers, applyMiddleware, createStore, compose } from 'redux'
import Reactotron from 'reactotron-react-native'
import createSagaMiddleware from 'redux-saga'

import profileReducer, { profileSagas } from './profile'
import playerReducer, { playerSagas } from './player'

const rootReducer = combineReducers({
  profile: profileReducer,
  player: playerReducer,
})

function* rootSaga() {
  yield all([call(profileSagas), call(playerSagas)])
}

export const configureStore = () => {
  const sagaMonitor = __DEV__ ? (Reactotron as any).createSagaMonitor() : null
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor })

  const enhancers = [applyMiddleware(sagaMiddleware)]

  if (__DEV__) {
    // eslint-disable-next-line no-console
    enhancers.push((Reactotron as any).createEnhancer())
  }

  const store = createStore(rootReducer, compose(...enhancers))

  sagaMiddleware.run(rootSaga)

  return store
}
