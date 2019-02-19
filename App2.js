import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import RNTrackPlayer, { ProgressComponent } from 'react-native-track-player';

import playlist from './playlist';
// import localTrack from './trackplayer/resources/pure.m4a';

class ProgressBar extends ProgressComponent {
  render() {
    const {
      position = 0,
      duration = 0,
    } = this.state
    const progress = this.getProgress();
    const buffered = this.getBufferedProgress();
    let positionFormatted = new Date(position * 1000).toISOString().substr(11, 8);
    let durationFormatted = new Date(duration * 1000).toISOString().substr(11, 8);

    return (
      <View style={styles.progressBar}>
        <View style={styles.progressTimes}>
          <Text style={styles.timeText}>{positionFormatted}</Text>
          <Text style={styles.timeText}>{durationFormatted}</Text>
        </View>
        <View style={styles.progressLine}>
          <View style={{flex: progress, backgroundColor: 'red'}} />
          <View style={{flex: 1 - progress, backgroundColor: '#bbb'}} />
        </View>
        {
          !!buffered &&
          <View style={styles.progressLine}>
            <View style={{flex: buffered, backgroundColor: '#f0f'}} />
            <View style={{flex: 1 - buffered, backgroundColor: '#bbb'}} />
          </View>
        }
        <View style={styles.controlsTime}>
          <ControlButton
            title={'-30s'}
            small={true}
            onPress={() => {RNTrackPlayer.seekTo(position - 30)}}
            disabled={position - 30 < 0}
          />
          <ControlButton
            title={'-20s'}
            small={true}
            onPress={() => {RNTrackPlayer.seekTo(position - 20)}}
            disabled={position - 20 < 0}
          />
          <ControlButton
            title={'-10s'}
            small={true}
            onPress={() => {RNTrackPlayer.seekTo(position - 10)}}
            disabled={position - 10 < 0}
          />
          <ControlButton
            title={'+10s'}
            small={true}
            onPress={() => {RNTrackPlayer.seekTo(position + 10)}}
            disabled={position + 10 > duration}
          />
          <ControlButton
            title={'+20s'}
            small={true}
            onPress={() => {RNTrackPlayer.seekTo(position + 20)}}
            disabled={position + 20 > duration}
          />
          <ControlButton
            title={'+30s'}
            small={true}
            onPress={() => {RNTrackPlayer.seekTo(position + 30)}}
            disabled={position + 30 > duration}
          />
        </View>
        <View style={styles.controlsTime}>
          <ControlButton
            title={'-45m'}
            small={true}
            onPress={() => {RNTrackPlayer.seekTo(position - 45 * 60)}}
            disabled={position - 45 * 60 < 0}
          />
          <ControlButton
            title={'-20m'}
            small={true}
            onPress={() => {RNTrackPlayer.seekTo(position - 25 * 60)}}
            disabled={position - 20 * 60 < 0}
          />
          <ControlButton
            title={'-10m'}
            small={true}
            onPress={() => {RNTrackPlayer.seekTo(position - 10 * 60)}}
            disabled={position - 10 * 60 < 0}
          />
          <ControlButton
            title={'+10m'}
            small={true}
            onPress={() => {RNTrackPlayer.seekTo(position + 10 * 60)}}
            disabled={position + 10 * 60 > duration}
          />
          <ControlButton
            title={'+20m'}
            small={true}
            onPress={() => {RNTrackPlayer.seekTo(position + 20 * 60)}}
            disabled={position + 20 * 60 > duration}
          />
          <ControlButton
            title={'+45m'}
            small={true}
            onPress={() => {RNTrackPlayer.seekTo(position + 45 * 60)}}
            disabled={position + 45 * 60 > duration}
          />
        </View>
      </View>
    );
  }
}

function ControlButton({title, onPress, disabled, small = false}) {
  return (
    <TouchableOpacity style={[small ? styles.controlButtonContainerSmall : styles.controlButtonContainer, disabled && {opacity: 0.2}]} onPress={onPress} disabled={disabled}>
      <Text style={small ? styles.controlButtonTextSmall : styles.controlButtonText}>{title}</Text>
    </TouchableOpacity>
  );
}

ControlButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paused: true,
      playlist: playlist,
      selected: 0,
      currentPosition: 0,
      totalLength: 1,

      firstPlayPress: false,
      playerStatus: '',
      playerQueue: [],
      trackStore: null,
    };
    this.audioElement = null;
  }

  componentDidMount() {
    // RNTrackPlayer.setupPlayer({
    //   minBuffer: 6, // Minimum time in seconds that needs to be buffered
    //   maxBuffer: 100, // Maximum time in seconds that needs to be buffered
    //   playBuffer: 4, // Minimum time in seconds that needs to be buffered to start playing
    //   maxCacheSize: 50000 // Maximum cache size in kilobytes
    // });
    RNTrackPlayer.setupPlayer();
    RNTrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        RNTrackPlayer.CAPABILITY_PLAY,
        RNTrackPlayer.CAPABILITY_PAUSE,
        RNTrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        RNTrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        RNTrackPlayer.CAPABILITY_STOP
      ],
      compactCapabilities: [
        RNTrackPlayer.CAPABILITY_PLAY,
        RNTrackPlayer.CAPABILITY_PAUSE
      ]
    });

    this._onTrackChangedListener = RNTrackPlayer.addEventListener('playback-track-changed', async (data) => {
      if (data.nextTrack) {
        const track = await RNTrackPlayer.getTrack(data.nextTrack);

        this.setState({
          trackStore: {
            title: track.title,
            artist: track.artist,
            artwork: track.artwork,
          }
        })
      }
    })
    this._onStateChangedListener = RNTrackPlayer.addEventListener('playback-state', this._onStateChanged);
    this._onStateChangedListener = RNTrackPlayer.addEventListener('playback-queue-ended', this._onQueueEnded);
  }

  componentWillUnmount() {
    this._onTrackChangedListener.remove()
    this._onStateChangedListener.remove()
    RNTrackPlayer.destroy();
  }

  _onTrackChanged = async (data) => {
    if (data.nextTrack) {
      const track = await RNTrackPlayer.getTrack(data.nextTrack);
      this.setState({
        trackStore: {
          title: track.title,
          artist: track.artist,
          artwork: track.artwork,
        },
      })
    }
  }

  _onStateChanged = (data) => {
    this.setState({
      playerStatus: data.state
    });
  }

  _onQueueEnded = (data) => {
    console.log('_onQueueEnded: ', data);
    if (this.state.firstPlayPress) {
      this._onPressPlay('reset');
    }
  }

  _onPressPlay = async (option) => {
    const currentTrack = await RNTrackPlayer.getCurrentTrack();

    if (!currentTrack) {
      if (!currentTrack) {
        this.setState({
          firstPlayPress: true,
        });
        await RNTrackPlayer.reset();
      } else {
        await RNTrackPlayer.removeUpcomingTracks();
      }
      await RNTrackPlayer.add(playlist);
      // await RNTrackPlayer.add({
      //   id: 'local-track',
      //   url: localTrack,
      //   title: 'Pure (local m4a)',
      //   artist: 'David Chavez',
      //   artwork: 'https://picsum.photos/200',
      // });
      await RNTrackPlayer.play();
      await RNTrackPlayer.getQueue()
        .then(queue => {
          this.setState({
            playerQueue: queue,
          });
        })
    } else if (option === 'reset') {
      await RNTrackPlayer.skip(this.state.playerQueue[0].id);
      await RNTrackPlayer.play();
    } else{
      if (this.state.playerStatus === RNTrackPlayer.STATE_PAUSED) {
        await RNTrackPlayer.play();
      } else {
        await RNTrackPlayer.pause();
      }
    }
  }

  _onPressNext = () => {
    RNTrackPlayer.skipToNext()
  }

  _onPressPrev = () => {
    RNTrackPlayer.skipToPrevious()
  }

  _changeTrack = index => {
    // console.log('_changeTrack: ', index);
    this.setState({
      selected: index,
      currentPosition: 0,
      totalLength: 1
    });
  }


  render() {
    const {
      paused,
      playlist,
      selected,
      totalLength,
      currentPosition,
      trackStore,
      playerStatus,
      playerQueue,
    } = this.state;

    var middleButtonText = 'PLAY'

    if (playerStatus === RNTrackPlayer.STATE_PLAYING || playerStatus === RNTrackPlayer.STATE_BUFFERING) {
      middleButtonText = 'PAUSE'
    }

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.header}>♪ DIGICO ♫</Text>
        <View style={[styles.card]}>
          <Image style={styles.cover} source={trackStore && trackStore.artwork || null} />
          <ProgressBar />
          <Text style={styles.title}>{trackStore && trackStore.title || ''}</Text>
          <Text style={styles.artist}>{trackStore && trackStore.artist || ''}</Text>
          <View style={styles.controls}>
            <ControlButton title={'<<'} onPress={this._onPressPrev} disabled={!playerQueue.length || (trackStore && playerQueue && trackStore.title === playerQueue[0].title) || playerStatus == RNTrackPlayer.STATE_PAUSED} />
            <ControlButton title={middleButtonText} onPress={this._onPressPlay} />
            <ControlButton title={'>>'} onPress={this._onPressNext} disabled={!playerQueue.length || (trackStore && playerQueue && trackStore.title === playerQueue[playerQueue.length - 1].title) || playerStatus == RNTrackPlayer.STATE_PAUSED} />
          </View>
        </View>
        <View style={styles.playlist}>
          {playerQueue.map((item, index) => (
            <TouchableOpacity
              key={index + '_' + item.id}
              onPress={() => {
                // if (selected !== index) {
                //   this._changeTrack(index);
                // }
              }}
            >
              <Text
                style={
                  trackStore && trackStore.title && item.title == trackStore.title
                    ? styles.playlistItemSelected
                    : styles.playlistItem
                }
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.scrollSeparator}/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 56,
  },
  scrollSeparator: {
    height: 24,
  },
  header: {
    margin: 16,
    textAlign: 'center'
  },
  playerControls: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  playerButton: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  playerButtonText: {
    padding: 8,
    textAlign: 'center'
  },
  playlist: {
    paddingVertical: 24
  },
  playlistItem: {
    paddingVertical: 2,
    color: 'blue'
  },
  playlistItemSelected: {
    paddingVertical: 2,
    color: 'green'
  },
  backgroundVideo: {
    backgroundColor: '#0001',
    width: '100%',
    height: 140
  },

  card: {
    borderRadius: 4,
    shadowRadius: 2,
    shadowOpacity: 0.1,
    alignItems: 'center',
    shadowColor: 'black',
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 1},
  },
  cover: {
    width: 140,
    height: 140,
    marginTop: 20,
    backgroundColor: '#bbb',
  },
  progressBar: {
    marginTop: 10,
    width: '90%',
  },
  progressLine: {
    height: 4,
    flexDirection: 'row',
  },
  title: {
    marginTop: 10,
  },
  artist: {
    fontWeight: 'bold',
  },
  controls: {
    marginVertical: 20,
    flexDirection: 'row',
  },
  controlsTime: {
    marginVertical: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  controlButtonContainer: {
    flex: 1,
  },
  controlButtonContainerSmall: {
    
  },
  controlButtonText: {
    fontSize: 18,
    textAlign: 'center',
  },
  controlButtonTextSmall: {
    fontSize: 12,
    textAlign: 'center',
  },
  progressTimes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    fontSize: 12,
  }
});
