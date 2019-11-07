import React from 'react'
import { User } from 'src/apollo'
import SectionWrapper from './SectionWrapper'
import SectionHeader from './SectionHeader'
import { Loader, Image, TextBase } from 'src/components'
import styled from 'src/styled-components'

const StarWrapper = styled.View`
  align-items: center;
  width: 100px;
`

const UserImage = styled(Image)`
  width: 84px;
  height: 84px;
  border-radius: 42px;
  margin-bottom: 8px;
`

const StarTitleText = styled(TextBase)`
  font-size: 14px;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.medium};
`

interface StarProps {
  user: User
}

const Star: React.FC<StarProps> = ({ user: { userName, avatar } }) => (
  <StarWrapper>
    <UserImage source={{ uri: avatar[0].imageUrl }} />
    <StarTitleText>{userName}</StarTitleText>
  </StarWrapper>
)

const Scroll = styled.ScrollView.attrs(() => ({
  horizontal: true,
}))`
  padding-horizontal: 8px;
`

interface Props {
  users: User[]
  isLoading: boolean
}

const StarsSection: React.FC<Props> = ({ isLoading, users }) => {
  if (!users.length && !isLoading) {
    return null
  }
  return (
    <SectionWrapper>
      <SectionHeader title="Звездные эксперты" />
      {isLoading ? (
        <Loader size={150} />
      ) : (
        <Scroll showsHorizontalScrollIndicator={false}>
          {users.map(user => (
            <Star user={user} key={user.id.toString()} />
          ))}
        </Scroll>
      )}
    </SectionWrapper>
  )
}

export default StarsSection
