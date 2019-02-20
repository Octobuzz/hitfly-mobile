import { takeLatest, all, put, delay } from 'redux-saga/effects'
import {
  REQUEST_LOGIN,
  REQUEST_LOGOUT,
  logInSuccess,
  logOutSuccess,
} from './duck'

function* requestLogInSaga({ payload: userName }) {
  yield delay(2000)
  yield put(logInSuccess({ userName }))
}

function* requestLogOutSaga() {
  yield delay(2000)
  yield put(logOutSuccess())
}

export default function*() {
  yield all([
    takeLatest(REQUEST_LOGIN, requestLogInSaga),
    takeLatest(REQUEST_LOGOUT, requestLogOutSaga),
  ])
}
