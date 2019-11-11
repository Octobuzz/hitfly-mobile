import L from 'lodash'
import React, { useEffect, useCallback } from 'react'
import { withNavigation } from 'react-navigation'
import { useQuery } from '@apollo/react-hooks'
import { GET_LISTENED_NOW, PlaylistData } from 'src/apollo'
import { PlaylistSection } from '../components'
import { ROUTES } from 'src/navigation'
import { images } from 'src/constants'

const ListenedNowContainer: React.FC<any> = ({ getRefetcher, navigation }) => {
  const { data, refetch, loading } = useQuery<PlaylistData>(GET_LISTENED_NOW, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  })

  const tracksCount = L.get(data, 'playlist.total', 0)

  useEffect(() => {
    if (getRefetcher) {
      getRefetcher(refetch)
    }
  }, [getRefetcher])

  const onPress = useCallback(() => {
    navigation.navigate(ROUTES.MAIN.LISTENED_NOW_PLAYLIST)
  }, [])

  return (
    <PlaylistSection
      isLoading={loading}
      onPress={onPress}
      tracksCount={tracksCount}
      imageSource={images.LISTENED_NOW}
      bottomTextType="tracksCount"
      subtitle="Обновлен вчера"
      title="Сейчас слушают"
    />
  )
}

export default withNavigation(ListenedNowContainer)
