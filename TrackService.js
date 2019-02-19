import RNTrackPlayer from 'react-native-track-player';

module.exports = async function () {

  RNTrackPlayer.addEventListener('remote-play', () => {
    console.log('RNTrackPlayer play');
    RNTrackPlayer.play();
  });

  RNTrackPlayer.addEventListener('remote-pause', () => {
    console.log('RNTrackPlayer pause');
    RNTrackPlayer.pause();
  });

  RNTrackPlayer.addEventListener('remote-next', () => {
    console.log('RNTrackPlayer skipToNext');
    RNTrackPlayer.skipToNext();
  });

  RNTrackPlayer.addEventListener('remote-previous', () => {
    console.log('RNTrackPlayer skipToPrevious');
    RNTrackPlayer.skipToPrevious();
  });

  RNTrackPlayer.addEventListener('remote-stop', () => {
    console.log('RNTrackPlayer destroy');
    RNTrackPlayer.destroy();
  });

};