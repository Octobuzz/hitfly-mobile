import R from 'ramda'
import { ProfileState } from './duck'

// FIXME: добавить весь стейт вместо any?
const getState: (state: any) => ProfileState = R.prop('profile')

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
