import L from 'lodash'
import React, { useEffect, useCallback } from 'react'
import { withNavigation } from 'react-navigation'
import { useQuery } from '@apollo/react-hooks'
import { PlaylistSection } from '../components'
import { GET_TOP50, PlaylistData } from 'src/apollo'
import { routes, images } from 'src/constants'

const Top50Container: React.FC<any> = ({ getRefetcher, navigation }) => {
  const { data, refetch, loading } = useQuery<PlaylistData>(GET_TOP50, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  })

  const playlist = L.get(data, 'playlist.items', [])

  useEffect(() => {
    if (getRefetcher) {
      getRefetcher(refetch)
    }
  }, [getRefetcher])

  const onPress = useCallback(() => {
    navigation.navigate(routes.MAIN.TOP_50_PLAYLIST)
  }, [])

  return (
    <PlaylistSection
      isLoading={loading}
      playlist={playlist}
      onPress={onPress}
      imageSource={images.TOP50_BACKGROUND}
      bottomTextType="tracksLength"
      subtitle="Рейтинг лучших музыкантов"
      title="Топ 50"
    />
  )
}

export default withNavigation(Top50Container)
