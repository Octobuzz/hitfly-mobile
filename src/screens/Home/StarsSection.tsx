import React, { useCallback } from 'react'
import { User } from 'src/apollo'
import { SectionWrapper, SectionHeader } from './components'
import { Loader, Image, TextBase } from 'src/components'
import styled from 'src/styled-components'

const StarWrapper = styled.TouchableOpacity`
  align-items: center;
  width: 100px;
`

const UserImage = styled(Image)`
  width: 84px;
  height: 84px;
  border-radius: 42px;
  margin-bottom: 8px;
`

const StarTitleText = styled(props => <TextBase {...props} />)`
  font-size: 14px;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.medium};
`

interface StarProps {
  user: User
  onPress: (user: User) => void
}

const Star: React.FC<StarProps> = ({ user, onPress }) => {
  const handlePress = useCallback(() => {
    onPress(user)
  }, [user, onPress])

  const { userName, avatar } = user

  return (
    <StarWrapper onPress={handlePress}>
      <UserImage source={{ uri: avatar[0].imageUrl }} />
      <StarTitleText>{userName}</StarTitleText>
    </StarWrapper>
  )
}

const Scroll = styled.ScrollView.attrs(() => ({
  horizontal: true,
}))`
  padding-horizontal: 8px;
`

interface Props {
  users: User[]
  isLoading: boolean
  onPressStar: (user: User) => void
}

const StarsSection: React.FC<Props> = ({ isLoading, users, onPressStar }) => {
  return (
    <SectionWrapper>
      <SectionHeader title="Звездные эксперты" />
      {isLoading && <Loader isAbsolute />}
      <Scroll showsHorizontalScrollIndicator={false}>
        {users.map(user => (
          <Star onPress={onPressStar} user={user} key={user.id.toString()} />
        ))}
      </Scroll>
    </SectionWrapper>
  )
}

export default StarsSection
