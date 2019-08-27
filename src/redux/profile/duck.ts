import R from 'ramda'
import { combineReducers } from 'redux'
import { createAction, createReducer } from 'deox'
import { getModuleActionName } from '../../utils/helpers'

/* #region Action Types */

const getActionName = getModuleActionName('profile')

export const REQUEST_LOGIN = getActionName('REQUEST_LOGIN')
export const LOGIN_SUCCESS = getActionName('LOGIN_SUCCESS')

export const REQUEST_LOGOUT = getActionName('REQUEST_LOGOUT')
export const LOGOUT_SUCCESS = getActionName('LOGOUT_SUCCESS')

/* #endregion */

/* #region Action Creators */

export const requestLogIn = createAction(REQUEST_LOGIN)
export const logInSuccess = createAction(
  LOGIN_SUCCESS,
  resolve => (payload: Profile) => resolve(payload),
)

export const requestLogOut = createAction(REQUEST_LOGOUT)
export const logOutSuccess = createAction(LOGOUT_SUCCESS)

/* #endregion */

/* #region reducers */

export interface Profile {
  userName: string
}

export interface ProfileState extends Profile {
  isFetching: boolean
}

const profileDefaultState: Profile = {
  userName: '',
}
const profile = createReducer(profileDefaultState, handleAction => [
  handleAction(logOutSuccess, R.always(profileDefaultState)),
  handleAction(
    logInSuccess,
    R.useWith(R.mergeDeepRight, [R.identity, R.prop('payload')]),
  ),
])

const isFetching = createReducer(false, handleAction => [
  handleAction([requestLogIn, requestLogOut], R.T),
  handleAction([logInSuccess, logOutSuccess], R.F),
])

/* #endregion */

export default combineReducers({ profile, isFetching })
