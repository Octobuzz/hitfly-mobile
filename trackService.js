import TrackPlayer from 'react-native-track-player'
module.exports = async function() {
  TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play())

  TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause())

  TrackPlayer.addEventListener('remote-next', () =>
    // так как выходит ошибка на последнем треке
    // пока не знаю как обработать и надо ли
    TrackPlayer.skipToNext().catch(() => {}),
  )

  TrackPlayer.addEventListener('remote-previous', () =>
    // так как выходит ошибка на первом треке
    // пока не знаю как обработать и надо ли
    TrackPlayer.skipToPrevious().catch(() => {}),
  )
  TrackPlayer.addEventListener('remote-seek', ({ position }) =>
    TrackPlayer.seekTo(position),
  )
}
