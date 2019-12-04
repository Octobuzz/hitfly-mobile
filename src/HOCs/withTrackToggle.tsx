import L from 'lodash'
import React, { useCallback } from 'react'
import TrackPlayer, { Track as RNTrack } from 'react-native-track-player'
// @ts-ignore больные ублюдки
import { usePlaybackState } from 'react-native-track-player/lib/hooks'
import { useMutation, useQuery } from '@apollo/react-hooks'
import {
  Track,
  ActiveTrackData,
  ActivePlaylistData,
  SetPlayerPropertiesVariables,
  GET_ACTIVE_TRACK,
  GET_ACTIVE_PLAYLIST,
  SET_PLAYER_PROPERTIES,
} from 'src/apollo'
import { images } from 'src/constants'
import { randomString, getSkipOptions } from 'src/helpers'

interface ToggleTrackOptions {
  track: Track
  playlistData?: {
    playlistKey: string
    playlist: Track[]
  }
}

interface ShuffleOptions {
  playlist: Track[]
}

export interface ToggleTrackProps {
  isPlaying: boolean
  canPlayNext: boolean
  canPlayPrev: boolean
  activeTrack?: Track
  activePlaylist?: Track[]
  prevTrack: () => void
  nextTrack: () => void
  toggleTrack: (options?: ToggleTrackOptions) => void
  shuffle: (options?: ShuffleOptions) => void
}

const withTrackToggle = <T extends ToggleTrackProps>(
  WrappedComponent: React.ComponentType<T>,
) => {
  const TrackToggle: React.FC<any> = props => {
    const [setProperties] = useMutation<any, SetPlayerPropertiesVariables>(
      SET_PLAYER_PROPERTIES,
    )
    const { data: activeTrackData } = useQuery<ActiveTrackData>(
      GET_ACTIVE_TRACK,
    )
    const { activeTrack, isPlaying, canPlayNext, canPlayPrev } = L.pick(
      activeTrackData,
      ['activeTrack', 'isPlaying', 'canPlayNext', 'canPlayPrev'],
    )

    const { data: activePlaylistData } = useQuery<ActivePlaylistData>(
      GET_ACTIVE_PLAYLIST,
    )
    const { activePlaylist, activePlaylistKey } = L.pick(activePlaylistData, [
      'activePlaylist',
      'activePlaylistKey',
    ])

    const continueTrack = useCallback(() => {
      setProperties({ variables: { isPlaying: true } })
      TrackPlayer.play()
    }, [])

    const pauseOrContinue = useCallback(() => {
      if (isPlaying) {
        pauseTrack()
      } else {
        continueTrack()
      }
    }, [isPlaying, continueTrack])

    const playTrack = useCallback(
      async ({ track, playlistData }: ToggleTrackOptions): Promise<void> => {
        // playlistKey служит для идентификации плейлиста
        // формат: key:id:items.length
        // key - уникальный ключ для плейлиста
        // id - еще один уникальный ключ (может не быть) - возможно не надо разделять через ':' ?
        // items.length - определяет количество треков в плейлисте
        // нужен для изменения ключа при пагинации плейлиста
        if (!playlistData || playlistData.playlistKey === activePlaylistKey) {
          TrackPlayer.skip(track.id.toString())
        } else if (playlistData) {
          const { playlist, playlistKey } = playlistData
          const skipOptions = getSkipOptions<number, Track>(track.id, playlist)
          await setProperties({
            variables: {
              activePlaylist: playlist,
              activePlaylistKey: playlistKey,
              ...skipOptions,
            },
          })
          const newQueue = playlist.map(createTrack)
          await TrackPlayer.initQueue(newQueue, track.id.toString())
          TrackPlayer.play()
        }
        setProperties({
          variables: { activeTrackId: track.id },
        })
      },
      [activePlaylistKey],
    )

    const createTrack = useCallback(
      ({
        id,
        title,
        singer,
        fileUrl,
        cover: [{ imageUrl }],
      }: Track): RNTrack => {
        return {
          title,
          url: fileUrl,
          id: id.toString(),
          artist: singer,
          artwork: imageUrl.endsWith('.svg') ? images.DEFAULT_TRACK : imageUrl,
        }
      },
      [],
    )

    const toggleTrack = useCallback(
      (options?: ToggleTrackOptions): void => {
        if (!options) {
          pauseOrContinue()
        } else if (!activeTrack || activeTrack.id !== options.track.id) {
          playTrack(options)
        } else {
          pauseOrContinue()
        }
      },
      [activeTrack, pauseOrContinue, playTrack],
    )

    const pauseTrack = useCallback((): void => {
      setProperties({ variables: { isPlaying: false } })
      TrackPlayer.pause()
    }, [])

    const nextTrack = useCallback((): void => {
      if (canPlayNext) {
        TrackPlayer.skipToNext()
      }
    }, [canPlayNext])
    const prevTrack = useCallback((): void => {
      if (canPlayPrev) {
        TrackPlayer.skipToPrevious()
      }
    }, [canPlayPrev])

    const shuffle = useCallback(
      (options?: ShuffleOptions): void => {
        let shuffledPlaylist: Track[] = []
        if (!options) {
          shuffledPlaylist = L.shuffle(activePlaylist)
        } else {
          const { playlist } = options
          shuffledPlaylist = L.shuffle(playlist)
        }
        const trackToPlay = shuffledPlaylist[0]
        playTrack({
          track: trackToPlay,
          playlistData: {
            playlist: shuffledPlaylist,
            playlistKey: randomString(),
          },
        })
      },
      [activePlaylist, playTrack],
    )

    return (
      <WrappedComponent
        canPlayNext={canPlayNext}
        canPlayPrev={canPlayPrev}
        shuffle={shuffle}
        nextTrack={nextTrack}
        prevTrack={prevTrack}
        isPlaying={isPlaying}
        toggleTrack={toggleTrack}
        activeTrack={activeTrack}
        activePlaylist={activePlaylist}
        {...props}
      />
    )
  }

  return TrackToggle
}

export default withTrackToggle
