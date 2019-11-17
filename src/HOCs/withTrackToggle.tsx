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

interface ToggleTrackOptions {
  track: Track
  playlistKey: string
  playlist: Track[]
}

export interface ToggleTrackProps {
  isPlaying: boolean
  toggleTrack: (options?: ToggleTrackOptions) => void
  activeTrack?: Track
}

const withTrackToggle = (
  WrappedComponent: React.ComponentType<ToggleTrackProps>,
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
    const activePlaylistKey = L.get(activePlaylistData, 'activePlaylistKey')

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
      [activeTrack, isPlaying, activePlaylistKey],
    )

    const pauseOrContinue = useCallback(() => {
      if (isPlaying) {
        pauseTrack()
      } else {
        continueTrack()
      }
    }, [isPlaying])

    const continueTrack = useCallback(() => {
      setIsPlaying({ variables: { isPlaying: true } })
      TrackPlayer.play()
    }, [])

    const playTrack = useCallback(
      async ({
        track,
        playlist,
        playlistKey,
      }: ToggleTrackOptions): Promise<void> => {
        // playlistKey служит для идентификации плейлиста
        // формат: key:id:items.length
        // key - уникальный ключ для плейлиста
        // id - еще один уникальный ключ (может не быть) - возможно не надо разделять через ':' ?
        // items.length - определяет количество треков в плейлисте
        // нужен для изменения ключа при пагинации плейлиста
        setActiveTrackId({
          variables: { id: track.id },
        })
        if (playlistKey === activePlaylistKey) {
          TrackPlayer.skip(track.id.toString())
        } else {
          await setActivePlaylist({ variables: { playlist, playlistKey } })
          const newQueue = playlist.map(createTrack)
          await TrackPlayer.initQueue(newQueue, track.id.toString())
          TrackPlayer.play()
        }
      },
      [activePlaylistKey],
    )

    const createTrack = useCallback(
      ({ id, fileUrl, title, group, singer }: Track): RNTrack => {
        return {
          id: id.toString(),
          url: fileUrl,
          title,
          artist: group ? group.title : singer,
        }
      },
      [],
    )

    const pauseTrack = useCallback((): void => {
      setIsPlaying({ variables: { isPlaying: false } })
      TrackPlayer.pause()
    }, [])

    return (
      <WrappedComponent
        isPlaying={isPlaying}
        toggleTrack={toggleTrack}
        activeTrack={activeTrack}
        {...props}
      />
    )
  }

  return TrackToggle
}

export default withTrackToggle
