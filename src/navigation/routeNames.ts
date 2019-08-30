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
  },
  MAIN: {
    HOME: `${APP.MAIN}/homde`,
  },
}
