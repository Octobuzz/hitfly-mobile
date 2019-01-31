import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import RNVideo from 'react-native-video';
import RNMusicControl from 'react-native-music-control';
import SeekBar from './SeekBar';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paused: true,
      playlist: [
        {
          artwork: require('./src/resources/images/artwork_0.png'),
          title: 'TwOnPs - Message Man (local mp3)',
          file: require('./src/resources/music/MessageMan.mp3')
        },
        {
          artwork: require('./src/resources/images/artwork_1.png'),
          title: 'TwOnPs - Stressed Out (server mp3)',
          uri: 'https://rejjer.io/music/top/02%20-%20Stressed%20Out.mp3'
        },
        {
          artwork: require('./src/resources/images/artwork_2.png'),
          title: 'TwOnPs - Ride (server mp3)',
          uri: 'https://rejjer.io/music/top/03%20-%20Ride.mp3'
        },
        {
          artwork: require('./src/resources/images/artwork_3.png'),
          title: 'TwOnPs - Tear In My Heart (server mp3)',
          uri: 'https://rejjer.io/music/top/05%20-%20Tear%20In%20My%20Heart.mp3'
        },
        {
          artwork: require('./src/resources/images/artwork_4.png'),
          title: 'Queen - We Will Rock You (deezer.com)',
          uri:
            'https://e-cdns-proxy-0.dzcdn.net/mobile/1/9e982cae4291ca4c0853f88896d5a153357f53b1616fa9f728fa52b8b32f8915feaba9aef6de4ee12ee9c6c2c4537e6b37787842a3e21693cdaaeb37871d19b4e094fc074a0b6745fdee73be7d5b94fe'
        },
        {
          artwork: require('./src/resources/images/artwork_5.png'),
          title: 'Stream 1',
          uri: 'http://46.146.214.204:8001/;stream/1'
        },
        {
          artwork: require('./src/resources/images/artwork_6.png'),
          title: 'Stream 2',
          uri: 'https://radio.promodj.com/channel5-192'
        },
        {
          artwork: require('./src/resources/images/artwork_7.png'),
          title: 'КИНО! (server mp4)',
          uri:
            'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
        }
      ],
      selected: 0,
      currentPosition: 0,
      totalLength: 1,
      videoKey: 0
    };
    this.audioElement = null;
  }

  componentDidMount() {
    RNMusicControl.enableBackgroundMode(true);
    if (Platform.OS == 'ios') {
      RNMusicControl.handleAudioInterruptions(true); // on iOS, pause playback during audio interruptions
    }

    // RNMusicControl.resetNowPlaying();
    RNMusicControl.enableControl('play', true);
    RNMusicControl.enableControl('pause', true);
    RNMusicControl.enableControl('nextTrack', true);
    RNMusicControl.enableControl('previousTrack', true);

    RNMusicControl.on('play', () => {
      // console.log('RNMusicControl: play');
      this.setState({ paused: false });
    });

    // on iOS this event will also be triggered by audio router change events
    // happening when headphones are unplugged or a bluetooth audio peripheral disconnects from the device
    RNMusicControl.on('pause', () => {
      // console.log('RNMusicControl: pause');
      this.setState({ paused: true });
    });

    RNMusicControl.on('previousTrack', this._onPressPrev);
    RNMusicControl.on('nextTrack', this._onPressNext);
  }

  _onPressPlay = () => {
    if (!this.state.paused) {
      this.setState(
        {
          paused: true
        },
        () => {
          RNMusicControl.resetNowPlaying();
        }
      );
    } else {
      this.setState(
        {
          paused: false
        },
        () => {
          const { playlist, selected } = this.state;
          RNMusicControl.setNowPlaying({
            title: playlist[selected].title,
            artwork: playlist[selected].artwork,
            artist: 'ArtistName',
            album: 'AlbumName',
            duration: this.state.totalLength
            // elapsedTime: 0
          });
        }
      );
    }
  };

  _onPressNext = () => {
    const { playlist, selected } = this.state;
    this._changeTrack(selected == playlist.length - 1 ? 0 : selected + 1);
  };

  _onPressPrev = () => {
    const { playlist, selected } = this.state;
    this._changeTrack(selected == 0 ? playlist.length - 1 : selected - 1);
  };

  _changeTrack = index => {
    // console.log('_changeTrack: ', index);
    this.setState({
      selected: index,
      videoKey:
        index == this.state.playlist.length - 1 ||
        this.state.selected == this.state.playlist.length - 1
          ? this.state.videoKey + 1
          : this.state.videoKey,
      currentPosition: 0,
      totalLength: 1
    });
  };

  _onLoad = data => {
    // console.log('_onLoad: ', data, ' this.audioElement: ', this.audioElement);
    this.setState({ totalLength: Math.floor(data.duration) });
  };

  _onProgress = data => {
    // console.log('_onProgress: ', data);
    RNMusicControl.updatePlayback({
      state: RNMusicControl.STATE_PLAYING, // (STATE_ERROR, STATE_STOPPED, STATE_PLAYING, STATE_PAUSED, STATE_BUFFERING)
      duration: data.playableDuration || 100,
      elapsedTime: data.currentTime || 0 // (Seconds)
    });
    this.setState({ currentPosition: Math.floor(data.currentTime) });
  };

  _onBuffer = data => {
    // console.log('_onBuffer: ', data);
  };

  _onEnd = data => {
    // console.log('_onEnd: ', data);
    this._onPressNext();
  };

  _onTimedMetadata = data => {
    // console.log('_onTimedMetadata: ', data);
  };

  _onSeek = time => {
    time = Math.round(time);
    this.audioElement && this.audioElement.seek(time);
    this.setState({
      currentPosition: time,
      paused: false
    });
  };

  render() {
    const {
      paused,
      playlist,
      selected,
      totalLength,
      currentPosition,
      videoKey
    } = this.state;

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.header}>♪ DIGICO ♫</Text>
        <View style={styles.playerControls}>
          <TouchableOpacity
            style={styles.playerButton}
            onPress={this._onPressPrev}
          >
            <Text style={styles.playerButtonText}>PREVIUS</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.playerButton}
            onPress={this._onPressPlay}
          >
            <Text style={styles.playerButtonText}>
              {paused ? 'PLAY' : 'PAUSE'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.playerButton}
            onPress={this._onPressNext}
          >
            <Text style={styles.playerButtonText}>NEXT</Text>
          </TouchableOpacity>
        </View>
        <SeekBar
          onSeek={this._onSeek}
          trackLength={totalLength}
          onSlidingStart={() => this.setState({ paused: true })}
          currentPosition={currentPosition}
        />
        <View style={styles.playlist}>
          {playlist.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                if (selected !== index) {
                  this._changeTrack(index);
                }
              }}
            >
              <Text
                style={
                  index == selected
                    ? styles.playlistItemSelected
                    : styles.playlistItem
                }
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <RNVideo
          key={videoKey}
          ref={node => {
            this.audioElement = node;
          }}
          playInBackground={true}
          playWhenInactive={true}
          ignoreSilentSwitch={'ignore'}
          audioOnly={true}
          source={
            playlist[selected].uri
              ? {
                  uri: playlist[selected].uri
                }
              : playlist[selected].file
          }
          paused={paused}
          onLoad={this._onLoad}
          onProgress={this._onProgress}
          progressUpdateInterval={800}
          onBuffer={this._onBuffer}
          onEnd={this._onEnd}
          onTimedMetadata={this._onTimedMetadata}
          // onError={this.videoError}
          style={styles.backgroundVideo}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    padding: 24
  },
  header: {
    margin: 24,
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
    marginVertical: 24
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
  }
});
