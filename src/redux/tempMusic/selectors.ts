import R from 'ramda'

const getState = R.prop('tempMusic')

const getAlbums = R.pipe(
  getState,
  R.prop('albums'),
)

export default {
  getAlbums,
}
