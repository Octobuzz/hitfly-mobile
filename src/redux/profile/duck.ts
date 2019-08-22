import R from 'ramda'
import { createAction, handleActions } from 'redux-actions'
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
export const logInSuccess = createAction(LOGIN_SUCCESS)

export const requestLogOut = createAction(REQUEST_LOGOUT)
export const logOutSuccess = createAction(LOGOUT_SUCCESS)

/* #endregion */

/* #region reducers */

const profile = handleActions(
  {
    [REQUEST_LOGIN]: state => ({ ...state, isFetching: true }),
    [LOGIN_SUCCESS]: R.useWith(
      (state, userName) => ({ userName, isFetching: false }),
      [R.identity, R.path(['payload', 'userName'])],
    ),
    [REQUEST_LOGOUT]: state => ({ ...state, isFetching: true }),
    [LOGOUT_SUCCESS]: state => ({ isFetching: false, userName: null }),
  },
  {
    userName: null,
    isFetching: false,
  },
)

/* #endregion */

export default profile
