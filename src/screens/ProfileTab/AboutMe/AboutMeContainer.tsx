import React from 'react'
import gql from 'graphql-tag'
import { DataProps, graphql } from '@apollo/react-hoc'
import AboutMeScreen from './AboutMe'
import { Profile } from 'src/apollo'
import { Loader } from 'src/components'

interface Props extends DataProps<{ profile: Profile }> {}

const AboutMeContainer: React.FC<Props> = ({
  data: { profile, loading },
  ...rest
}) => {
  if (loading) {
    return <Loader isAbsolute />
  }
  if (!profile) {
    return null
  }

  return <AboutMeScreen profile={profile} {...rest} />
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

// @ts-ignore
export default graphql<Props>(GET_PROFILE_FOR_ABOUT)(AboutMeContainer)
