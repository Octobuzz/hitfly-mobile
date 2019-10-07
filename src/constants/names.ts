import {
  STATE_BUFFERING,
  STATE_NONE,
  STATE_PAUSED,
  STATE_PLAYING,
  STATE_READY,
  STATE_STOPPED,
} from 'react-native-track-player'
export const APP_NAME = 'hitfly'
export const BASE_URL = 'http://digico.itech-test.ru/graphql'

export const SERVER_DATE_FORMAT = 'yyyy-MM-dd HH:mm:ss'

export const MOVES = {
  LEFT: 'LEFT',
  UP: 'UP',
  RIGHT: 'RIGHT',
  DOWN: 'DOWN',
  HORIZONTAL: 'HORIZONTAL',
  VERTICAL: 'VERTICAL',
}

// FIXME: remove
export const PLAYER_STATES = {
  NONE: STATE_NONE,
  PLAYING: STATE_PLAYING,
  PAUSED: STATE_PAUSED,
  STOPPED: STATE_STOPPED,
  BUFERING: STATE_BUFFERING,
  READY: STATE_READY,
}
