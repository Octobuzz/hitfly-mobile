import R from 'ramda'

const getState = R.prop('profile')

const getIsFetching = R.pipe(
  getState,
  R.prop('isFetching'),
)

const getUserName = R.pipe(
  getState,
  R.prop('userName'),
)

export default {
  getIsFetching,
  getUserName,
}
