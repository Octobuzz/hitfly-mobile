const APP = {
  AUTH: 'auth',
  MAIN: 'main',
  PLAYER: 'player',
  PROFILE: 'profile',
  LIFEHACKS: 'lifehacks',
  LIFEHACKS2: 'lifehacks2',
  WELCOME: 'welcome',
  STORYBOOK: 'storybook',
  EASTER_EGG: 'easter_egg',
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
    POLICY: `${APP.AUTH}/policy`,
  },
  MAIN: {
    HOME: `${APP.MAIN}/home`,
    RECOMMENDED_DETAILS: `${APP.MAIN}/recommended_details`,
    MUSIC_FAN_DETAILS: `${APP.MAIN}/music_fan_details`,
    COLLECTION_PLAYLIST: `${APP.MAIN}/collection_playlist`,
    TOP_50_PLAYLIST: `${APP.MAIN}/top_50_playlist`,
    LISTENED_NOW_PLAYLIST: `${APP.MAIN}/listened_now_playlist`,
    NEW_PLAYLIST: `${APP.MAIN}/new_playlist`,
    TOP_WEEK_PLAYLIST: `${APP.MAIN}/top_week_playlist`,
    GENRE_PLAYLIST: `${APP.MAIN}/genre_playlist`,
    GENRES_DETAILED: `${APP.MAIN}/genres_detailed`,
  },

  TABS: {
    HOME: 'tab/home',
    PROFILE: 'tab/profile',
    LIFEHACKS: 'tab/lifehacks',
    LIFEHACKS2: 'tab/lifehacks2',
  },

  LIFEHACKS: {
    LIFEHACKS: `${APP.LIFEHACKS}/lifehacks`,
    LIFEHACK_DETAILED: `${APP.LIFEHACKS}/lifehack_detailed`,
  },

  LIFEHACKS2: {
    LIFEHACKS: `${APP.LIFEHACKS}/lifehacks`,
  },

  PROFILE: {
    PROFILE: `${APP.PROFILE}/profile`,
    SETTINGS: `${APP.PROFILE}/settings`,
    ALBUM_PLAYLIST: `${APP.PROFILE}/album_playlist`,
    REMOVE_ACCOUNT: `${APP.PROFILE}/remove_account`,
    SELECT_GENRE: `${APP.PROFILE}/select_genre`,
    MY_GENRES: `${APP.PROFILE}/my_genres`,
    AUTH_SETTINGS: `${APP.PROFILE}/auth_settings`,
    CHANGE_PASSWORD: `${APP.PROFILE}/change_password`,
    SOCIAL_AUTH: `${APP.PROFILE}/social_auth`,
    MY_ALBUMS_DETAILED: `${APP.PROFILE}/my_albums_detailed`,
    MY_MUSIC_PLAYLIST: `${APP.PROFILE}/my_music_playlist`,
    LIKED_ALBUMS_DETAILED: `${APP.PROFILE}/liked_albums_detailed`,
    LIKED_MUSIC_PLAYLIST: `${APP.PROFILE}/liked_music_playlist`,
  },

  PLAYER: {
    MODAL_PLAYER: `${APP.PLAYER}/modal_player`,
    MODAL_PLAYLIST: `${APP.PLAYER}/modal_playlist`,
  },

  EASTER_EGG: {
    EGG_LOGIN: `${APP.EASTER_EGG}/egg_login`,
    EGG_MAIN: `${APP.EASTER_EGG}/egg_main`,
  },
}
