import React from 'react'
import TrackPlayer from 'react-native-track-player'

class TrackPlayerServices extends React.Component {
  onRemotePlayListener = null
  onRemotePauseListener = null
  onRemoteNextListener = null
  onRemotePrevuisListener = null
  onRemoteStopListener = null
  onPlaybackStateListener = null
  onPlaybackTrackChangedListener = null
  onPlaybackQueueEndedListener = null
  onPlaybackErrorListener = null

  componentDidMount() {
    TrackPlayer.setupPlayer().then(() => {
      TrackPlayer.registerPlaybackService(() => this._registerPlayerServices)
    })
  }

  componentWillUnmount() {
    this._removeEvantListeners()
    TrackPlayer.destroy()
  }

  _registerPlayerServices = async () => {
    this.onRemotePlayListener = TrackPlayer.addEventListener(
      'remote-play',
      this.onTP_remotePlay,
    )
    this.onRemotePauseListener = TrackPlayer.addEventListener(
      'remote-pause',
      this.onTP_remotePause,
    )
    this.onRemoteNextListener = TrackPlayer.addEventListener(
      'remote-next',
      this.onTP_remoteNext,
    )
    this.onRemotePrevuisListener = TrackPlayer.addEventListener(
      'remote-previous',
      this.onTP_remotePrevuis,
    )
    this.onRemoteStopListener = TrackPlayer.addEventListener(
      'remote-stop',
      this.onTP_remoteStop,
    )
    this.onPlaybackStateListener = TrackPlayer.addEventListener(
      'playback-state',
      this.onTP_playbackState,
    )
    this.onPlaybackTrackChangedListener = TrackPlayer.addEventListener(
      'playback-track-changed',
      this.onTP_playbackTrackChanged,
    )
    this.onPlaybackQueueEndedListener = TrackPlayer.addEventListener(
      'playback-queue-ended',
      this.onTP_playbackQueueEnded,
    )
    this.onPlaybackErrorListener = TrackPlayer.addEventListener(
      'playback-error',
      this.onTP_playbackError,
    )
  }

  _removeEvantListeners = () => {
    this.onRemotePlayListener.remove()
    this.onRemotePauseListener.remove()
    this.onRemoteNextListener.remove()
    this.onRemotePrevuisListener.remove()
    this.onRemoteStopListener.remove()
    this.onPlaybackStateListener.remove()
    this.onPlaybackTrackChangedListener.remove()
    this.onPlaybackQueueEndedListener.remove()
    this.onPlaybackErrorListener.remove()
  }

  onTP_RemotePlay = () => {
    // console.log('TrackPlayer remote-play')
    TrackPlayer.play()
  }

  onTP_remotePause = () => {
    // console.log('TrackPlayer remote-pause')
    TrackPlayer.pause()
  }

  onTP_remoteNext = () => {
    // console.log('TrackPlayer remote-next')
    TrackPlayer.skipToNext()
  }

  onTP_remotePrevuis = () => {
    // console.log('TrackPlayer remote-previous')
    TrackPlayer.skipToPrevious()
  }

  onTP_remoteStop = () => {
    // console.log('TrackPlayer remote-stop')
    // TrackPlayer.destroy()
  }

  onTP_playbackState = ({ state }) => {
    // console.log('TrackPlayer playback-state: ', state)
  }

  onTP_playbackTrackChanged = e => {
    // console.log('TrackPlayer playback-track-changed: ', e)
  }

  onTP_playbackQueueEnded = e => {
    // console.log('TrackPlayer playback-queue-ended: ', e)
  }

  onTP_playbackError = e => {
    // console.log('TrackPlayer playback-error: ', e)
  }
}

export default TrackPlayerServices
