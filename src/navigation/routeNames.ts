const APP = {
  AUTH: 'auth',
  MAIN: 'main',
  STORYBOOK: 'storybook',
}

export default {
  APP,
  AUTH: {
    WELCOME: `${APP.AUTH}/welcome`,
    LOGIN: `${APP.AUTH}/login`,
    REGISTER: `${APP.AUTH}/register`,
    SELECT_GENRE: `${APP.AUTH}/select_genre`,
    SOCIAL_AUTH: `${APP.AUTH}/social_auth`,
    FORGOT_PASSWORD: `${APP.AUTH}/forgot_password`,
    RECOVERY_INFO: `${APP.AUTH}/recovery_info`,
  },
  MAIN: {
    HOME: `${APP.MAIN}/home`,
    COLLECTION_DETAILS: `${APP.MAIN}/collection_details`,
    COLLECTION_PLAYLIST: `${APP.MAIN}/collection_playlist`,
    TOP_50_PLAYLIST: `${APP.MAIN}/top_50_playlist`,
    LISTENED_NOW_PLAYLIST: `${APP.MAIN}/listened_now_playlist`,
  },
}
