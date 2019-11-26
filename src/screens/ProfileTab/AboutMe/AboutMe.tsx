import React from 'react'
import { Loader, ScrollView, RefreshControl } from 'src/components'
import BonusProgram from './BonusProgram'
import ProfileGroup from './ProfileGroup'
import ProfileInfo from './ProfileInfo'
import Description from './Description'
import { Profile } from 'src/apollo'

interface Props {
  profile: Profile
  isLoading: boolean
  isRefreshing: boolean
  onRefresh: () => void
}

const AboutMe: React.FC<Props> = ({
  onRefresh,
  isRefreshing,
  isLoading,
  profile: {
    location,
    musicGroups,
    description,
    playsInGenres,
    careerStartDate,
    bonusProgramLevel,
    bonusProgramPoints,
    daysInBonusProgram,
    favouritesTracksCount,
  },
}) => {
  return isLoading ? (
    <Loader isAbsolute />
  ) : (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
    >
      <ProfileInfo genres={playsInGenres} location={location} />
      <ProfileGroup musicGroups={musicGroups} />
      <BonusProgram
        bonusProgramLevel={bonusProgramLevel}
        bonusProgramPoints={bonusProgramPoints}
        daysInBonusProgram={daysInBonusProgram}
        favouritesTracksCount={favouritesTracksCount}
      />
      <Description
        description={description}
        careerStartDate={careerStartDate}
      />
    </ScrollView>
  )
}

export default AboutMe
