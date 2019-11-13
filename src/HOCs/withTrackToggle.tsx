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
  SET_ACTIVE_TRACK,
  SetActiveTrackVariables,
  SET_ACTIVE_PLAYLIST,
  SetActivePlaylistVariables,
  SET_IS_PLAYING,
  SetIsPlayingVariables,
} from 'src/apollo'

interface ToggleTrackOptions {
  track: Track
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
    const [setActiveTrack] = useMutation<any, SetActiveTrackVariables>(
      SET_ACTIVE_TRACK,
    )
    const [setActivePlaylist] = useMutation<any, SetActivePlaylistVariables>(
      SET_ACTIVE_PLAYLIST,
    )
    const [setIsPlaying] = useMutation<any, SetIsPlayingVariables>(
      SET_IS_PLAYING,
    )

    const { data } = useQuery<ActiveTrackData>(GET_ACTIVE_TRACK)
    const activeTrack = L.get(data, 'activeTrack')
    const isPlaying = L.get(data, 'isPlaying')

    const toggleTrack = useCallback(
      (options?: ToggleTrackOptions): void => {
        // когда нет опций - на паузу
        if (!options) {
          if (isPlaying) {
            pauseTrack()
          } else {
            continueTrack()
          }
          return
        }
        if (!activeTrack) {
          playTrack(options)
          return
        }
        // когда новый трек не равен текущему - играем новый трек
        if (activeTrack.id !== options.track.id) {
          playTrack(options)
          return
        }
        // когда новый трек равен текущему - пауза или продолжить играть
        else {
          if (isPlaying) {
            pauseTrack()
          } else {
            continueTrack()
          }
        }
      },
      [activeTrack, isPlaying],
    )

    const continueTrack = useCallback(async () => {
      setIsPlaying({ variables: { isPlaying: true } })
      TrackPlayer.play()
    }, [])

    const playTrack = useCallback(
      async ({ track, playlist }: ToggleTrackOptions): Promise<void> => {
        setActiveTrack({
          variables: { track },
        })
        setActivePlaylist({ variables: { playlist } })
        const newPlaylist = playlist.map(createTrack)
        await TrackPlayer.reset()
        await TrackPlayer.add(newPlaylist)
        await TrackPlayer.skip(track.id.toString())
        TrackPlayer.play()
      },
      [],
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
