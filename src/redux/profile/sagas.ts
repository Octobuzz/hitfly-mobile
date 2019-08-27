import { takeLatest, all, put } from 'redux-saga/effects'
import {
  REQUEST_LOGIN,
  REQUEST_LOGOUT,
  logInSuccess,
  logOutSuccess,
} from './duck'

function* requestLogInSaga() {
  yield put(logInSuccess({ userName: 'Nikolay' }))
}

function* requestLogOutSaga() {
  yield put(logOutSuccess())
}

export default function*() {
  yield all([
    takeLatest(REQUEST_LOGIN, requestLogInSaga),
    takeLatest(REQUEST_LOGOUT, requestLogOutSaga),
  ])
}
