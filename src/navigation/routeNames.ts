const APP = {
  AUTH: 'auth',
  MAIN: 'main',
  WELCOME: 'welcome',
  STORYBOOK: 'storybook',
}

export default {
  APP,
  AUTH: {
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
    NEW_PLAYLIST: `${APP.MAIN}/new_playlist`,
    TOP_WEEK_PLAYLIST: `${APP.MAIN}/top_week_playlist`,
    GENRE_PLAYLIST: `${APP.MAIN}/genre_playlist`,
    ALBUM_PLAYLIST: `${APP.MAIN}/album_playlist`,

    PROFILE: `${APP.MAIN}/profile`,
    SETTINGS: `${APP.MAIN}/settings`,
    REMOVE_ACCOUNT: `${APP.MAIN}/remove_account`,
    SELECT_GENRE: `${APP.MAIN}/select_genre`,
    MY_GENRES: `${APP.MAIN}/my_genres`,
    AUTH_SETTINGS: `${APP.MAIN}/auth_settings`,
    SOCIAL_AUTH: `${APP.MAIN}/social_auth`,
  },
}
