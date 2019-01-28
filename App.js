import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import RNVideo from 'react-native-video';
import SeekBar from './SeekBar';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paused: true,
      playlist: [
        {
          title: 'Twenty One Pilots - Stressed Out',
          uri: 'https://rejjer.io/music/top/02%20-%20Stressed%20Out.mp3'
        },
        {
          title: 'Twenty One Pilots - Ride',
          uri: 'https://rejjer.io/music/top/03%20-%20Ride.mp3'
        },
        {
          title: 'Twenty One Pilots - Tear In My Heart',
          uri: 'https://rejjer.io/music/top/05%20-%20Tear%20In%20My%20Heart.mp3'
        },
        {
          title: 'Twenty One Pilots - Lane Boy',
          uri: 'https://rejjer.io/music/top/06%20-%20Lane%20Boy.mp3'
        },
        {
          title: 'Stream 1',
          uri: 'http://46.146.214.204:8001/;stream/1'
        },
        {
          title: 'Stream 2',
          uri: 'https://radio.promodj.com/channel5-192'
        },
        {
          title: 'КИНО!',
          uri:
            'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
        }
      ],
      selected: 0,
      currentPosition: 0,
      totalLength: 1
    };
    this.audioElement = null;
  }

  _onPressPlay = () => {
    this.setState({
      paused: !this.state.paused
    });
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
    console.log('_changeTrack: ', index);
    this.setState({
      selected: index,
      currentPosition: 0,
      totalLength: 1
    });
  };

  _onLoad = data => {
    console.log('_onLoad: ', data);
    this.setState({ totalLength: Math.floor(data.duration) });
  };

  _onProgress = data => {
    console.log('_onProgress: ', data);
    this.setState({ currentPosition: Math.floor(data.currentTime) });
  };

  _onBuffer = data => {
    console.log('_onBuffer: ', data);
  };

  _onEnd = data => {
    console.log('_onEnd: ', data);
    this._onPressNext();
  };

  _onTimedMetadata = data => {
    console.log('_onTimedMetadata: ', data);
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
      currentPosition
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
          ref={node => {
            this.audioElement = node;
          }}
          playInBackground={true}
          playWhenInactive={true}
          ignoreSilentSwitch={'ignore'}
          audioOnly={true}
          source={{
            uri: playlist[selected].uri
          }}
          paused={paused}
          onLoad={this._onLoad}
          onProgress={this._onProgress}
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
    backgroundColor: '#0004',
    width: '100%',
    height: 140
  }
});
