import L from 'lodash'
import React, { useCallback } from 'react'
import TrackPlayer, { Track as RNTrack } from 'react-native-track-player'
// @ts-ignore больные ублюдки
import { usePlaybackState } from 'react-native-track-player/lib/hooks'
import { useMutation, useQuery } from '@apollo/react-hooks'
import {
  Track,
  GET_ACTIVE_TRACK,
  ActiveTrackData,
  SET_ACTIVE_TRACK_ID,
  SetActiveTrackIdVariables,
  SET_ACTIVE_PLAYLIST,
  SetActivePlaylistVariables,
  SET_IS_PLAYING,
  SetIsPlayingVariables,
  ActivePlaylistData,
  GET_ACTIVE_PLAYLIST,
} from 'src/apollo'
import { images } from 'src/constants'
import { randomString } from 'src/helpers'

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
    const [setActiveTrackId] = useMutation<any, SetActiveTrackIdVariables>(
      SET_ACTIVE_TRACK_ID,
    )
    const [setActivePlaylist] = useMutation<any, SetActivePlaylistVariables>(
      SET_ACTIVE_PLAYLIST,
    )
    const [setIsPlaying] = useMutation<any, SetIsPlayingVariables>(
      SET_IS_PLAYING,
    )

    const { data: activeTrackData } = useQuery<ActiveTrackData>(
      GET_ACTIVE_TRACK,
    )
    const { activeTrack, isPlaying } = L.pick(activeTrackData, [
      'activeTrack',
      'isPlaying',
    ])

    const { data: activePlaylistData } = useQuery<ActivePlaylistData>(
      GET_ACTIVE_PLAYLIST,
    )
    const { activePlaylist, activePlaylistKey } = L.pick(activePlaylistData, [
      'activePlaylist',
      'activePlaylistKey',
    ])

    const continueTrack = useCallback(() => {
      setIsPlaying({ variables: { isPlaying: true } })
      TrackPlayer.play()
    }, [])

    const pauseOrContinue = useCallback(() => {
      if (isPlaying) {
        pauseTrack()
      } else {
        continueTrack()
      }
    }, [isPlaying, continueTrack])

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
      [activeTrack, pauseOrContinue],
    )

    const playTrack = useCallback(
      async ({ track, playlistData }: ToggleTrackOptions): Promise<void> => {
        // playlistKey служит для идентификации плейлиста
        // формат: key:id:items.length
        // key - уникальный ключ для плейлиста
        // id - еще один уникальный ключ (может не быть) - возможно не надо разделять через ':' ?
        // items.length - определяет количество треков в плейлисте
        // нужен для изменения ключа при пагинации плейлиста
        setActiveTrackId({
          variables: { id: track.id },
        })
        if (!playlistData || playlistData.playlistKey === activePlaylistKey) {
          TrackPlayer.skip(track.id.toString())
        } else if (playlistData) {
          const { playlist, playlistKey } = playlistData
          setActivePlaylist({ variables: { playlist, playlistKey } })
          const newQueue = playlist.map(createTrack)
          await TrackPlayer.initQueue(newQueue, track.id.toString())
          TrackPlayer.play()
        }
      },
      [activePlaylistKey],
    )

    const createTrack = useCallback(
      ({
        id,
        title,
        group,
        singer,
        fileUrl,
        cover: [{ imageUrl }],
      }: Track): RNTrack => {
        return {
          title,
          url: fileUrl,
          id: id.toString(),
          artist: group ? group.title : singer,
          artwork: imageUrl.endsWith('.svg') ? images.DEFAULT_TRACK : imageUrl,
        }
      },
      [],
    )

    const pauseTrack = useCallback((): void => {
      setIsPlaying({ variables: { isPlaying: false } })
      TrackPlayer.pause()
    }, [])

    const nextTrack = useCallback((): void => {
      // TODO: обработать?
      TrackPlayer.skipToNext().catch(() => {})
    }, [])
    const prevTrack = useCallback((): void => {
      // TODO: обработать?
      TrackPlayer.skipToPrevious().catch(() => {})
    }, [])

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
