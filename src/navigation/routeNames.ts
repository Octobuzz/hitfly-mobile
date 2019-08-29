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
  },
  MAIN: {
    HOME: `${APP.MAIN}/homde`,
  },
}
