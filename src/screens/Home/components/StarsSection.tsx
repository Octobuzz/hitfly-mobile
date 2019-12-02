import React from 'react'
import { User, AvatarSizeNames } from 'src/apollo'
import { Loader, Image, TextBase, SectionHeader } from 'src/components'
import SectionWrapper from './SectionWrapper'
import { useImageSource } from 'src/Hooks'
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

const Star: React.FC<StarProps> = ({ user: { userName, avatar } }) => {
  const source = useImageSource(avatar, AvatarSizeNames.S_235)
  return (
    <StarWrapper>
      <UserImage source={source} />
      <StarTitleText>{userName}</StarTitleText>
    </StarWrapper>
  )
}

const Scroll = styled.ScrollView.attrs(() => ({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    paddingHorizontal: 8,
  },
}))``

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
        <Scroll>
          {users.map(user => (
            <Star user={user} key={user.id.toString()} />
          ))}
        </Scroll>
      )}
    </SectionWrapper>
  )
}

export default StarsSection
