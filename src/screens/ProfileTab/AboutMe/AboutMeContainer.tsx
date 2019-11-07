import L from 'lodash'
import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import AboutMeScreen from './AboutMe'
import { Profile } from 'src/apollo'

const AboutMeContainer: React.FC = () => {
  const { data, refetch, networkStatus } = useQuery<{
    profile?: Profile
  }>(GET_PROFILE_FOR_ABOUT, { notifyOnNetworkStatusChange: true })
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

const GET_PROFILE_FOR_ABOUT = gql`
  query {
    profile: myProfile {
      favouriteGenres {
        id
        title: name
      }
      location {
        title
      }
      careerStartDate: careerStart
      description
      bonusProgramLevel: bpLevelBonusProgram
      bonusProgramPoints: bpPoints
      daysInBonusProgram: bpDaysInProgram
      favouritesTracksCount: favouritesTrackCount
      musicGroups {
        id
        title: name
        followersCount
        cover: avatarGroup(sizes: [size_290x290]) {
          imageUrl: url
        }
      }
    }
  }
`

export default AboutMeContainer
