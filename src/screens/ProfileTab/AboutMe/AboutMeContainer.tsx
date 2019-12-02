import L from 'lodash'
import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { Profile, PROFILE_AVATAR } from 'src/apollo'
import AboutMeScreen from './AboutMe'

const AboutMeContainer: React.FC = () => {
  const { data, refetch, networkStatus } = useQuery<{
    profile?: Profile
  }>(GET_PROFILE_FOR_ABOUT, {
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  })
  const profile = L.get(data, 'profile')
  if (!profile) {
    return null
  }

  return (
    <AboutMeScreen
      isLoading={networkStatus === 1}
      isRefreshing={networkStatus === 4}
      onRefresh={refetch}
      profile={profile}
    />
  )
}

// лишние поля здесь для рефреша
const GET_PROFILE_FOR_ABOUT = gql`
  query {
    profile: myProfile {
      userName: username
      followersCount
      ...ProfileAvatar
      roles {
        slug
      }
      playsInGenres: genresPlay {
        id
        title: name
      }
      location {
        title
      }
      description
      careerStartDate: careerStart
      bonusProgramLevel: bpLevelBonusProgram
      bonusProgramPoints: bpPoints
      daysInBonusProgram: bpDaysInProgram
      favouritesTracksCount: favouritesTrackCount
      musicGroups {
        id
        title: name
        followersCount
        cover: avatarGroup(sizes: [size_32x32]) {
          imageUrl: url
        }
      }
    }
  }
  ${PROFILE_AVATAR}
`

export default AboutMeContainer
