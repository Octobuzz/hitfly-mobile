import R from 'ramda'
import { AsyncStorage } from 'react-native'
import { all, call } from 'redux-saga/effects'
import { combineReducers, applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from 'redux-persist'
import {
  seamlessImmutableReconciler,
  seamlessImmutableTransformCreator,
} from 'redux-persist-seamless-immutable'
import { createLogger } from 'redux-logger'

import profileReducer, { profileSagas } from './profile'

const rootReducer = combineReducers({
  profile: profileReducer,
})

function* rootSaga() {
  yield all([call(profileSagas)])
}

const transformerConfig = {
  whitelistPerReducer: {},
}

const persistConfig = {
  key: 'primary',
  storage: AsyncStorage,
  timeout: 0,
  // whitelist: ['profile'],
  stateReconciler: seamlessImmutableReconciler,
  transforms: [seamlessImmutableTransformCreator(transformerConfig)],
}

export const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware()

  const rootPersistReducer = persistReducer(persistConfig, rootReducer)

  const middlewares = R.filter(R.complement(R.isNil), [
    sagaMiddleware,
    __DEV__ ? createLogger({ collapsed: true }) : null,
  ])

  const store = createStore(rootPersistReducer, applyMiddleware(...middlewares))

  persistStore(store, null, () => {
    store.getState()
  })

  sagaMiddleware.run(rootSaga)

  return store
}
