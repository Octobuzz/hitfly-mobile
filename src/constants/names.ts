export const APP_NAME = 'hitfly'
// export const DOMAIN_URL = 'https://digico.itech-test.ru/' // - тестовый
export const DOMAIN_URL = 'https://dev-php-hitfly.tmweb.ru/'
// export const DOMAIN_URL = 'https://myhitfly.ru/' - старый прод
export const BASE_URL = `${DOMAIN_URL}graphql`

export const SERVER_DATE_FORMAT = 'yyyy-MM-dd HH:mm:ss'

// лимиты для одного и того же запроса должны быть разными,
// иначе будет баг с повторяющимися onEndReached
export const PLAYLIST_LIMIT = 20
export const HOME_SECTION_LIMIT = 10
export const DETAILED_LIMIT = 30
export const LIFEHACKS_LIMIT = 30

export const PLAYLIST_KEYS = {
  TRACKS_FEEDBACK: 'tracks_feedback',
  TOP_WEEK: 'top_week',
  TOP_50: 'top_50',
  NEW_TRACKS: 'new_tracks',
  MY_MUSIC: 'my_music',
  LIKED_MUSIC: 'liked_music',
  LISTENED_NOW: 'listened_now',
  GENRE: 'genre',
  ALBUM: 'album',
  COLLECTION: 'collection',
}
