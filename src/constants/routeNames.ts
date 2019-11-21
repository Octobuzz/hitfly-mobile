const APP = {
  AUTH: 'auth',
  MAIN: 'main',
  PLAYER: 'player',
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
    GENRES_DETAILED: `${APP.MAIN}/genres_detailed`,
    ALBUM_PLAYLIST: `${APP.MAIN}/album_playlist`,

    PROFILE: `${APP.MAIN}/profile`,
    SETTINGS: `${APP.MAIN}/settings`,
    REMOVE_ACCOUNT: `${APP.MAIN}/remove_account`,
    SELECT_GENRE: `${APP.MAIN}/select_genre`,
    MY_GENRES: `${APP.MAIN}/my_genres`,
    AUTH_SETTINGS: `${APP.MAIN}/auth_settings`,
    CHANGE_PASSWORD: `${APP.MAIN}/change_password`,
    SOCIAL_AUTH: `${APP.MAIN}/social_auth`,
    MY_ALBUMS_DETAILED: `${APP.MAIN}/my_albums_detailed`,
    MY_MUSIC_PLAYLIST: `${APP.MAIN}/my_music_playlist`,
    LIKED_ALBUMS_DETAILED: `${APP.MAIN}/liked_albums_detailed`,
    LIKED_MUSIC_PLAYLIST: `${APP.MAIN}/liked_music_playlist`,
  },

  PLAYER: {
    MODAL_PLAYER: `${APP.PLAYER}/modal_player`,
    MODAL_PLAYLIST: `${APP.PLAYER}/modal_playlist`,
  },
}
