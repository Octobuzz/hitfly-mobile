import React from 'react'
import { User } from 'src/apollo'
import { SectionWrapper, SectionHeader } from './components'
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
  return (
    <SectionWrapper>
      <SectionHeader title="Звездные эксперты" />
      {isLoading && <Loader isAbsolute />}
      <Scroll showsHorizontalScrollIndicator={false}>
        {users.map(({ id, userName, avatar }) => (
          <StarWrapper key={id.toString()}>
            <UserImage source={{ uri: avatar[0].imageUrl }} />
            <StarTitleText>{userName}</StarTitleText>
          </StarWrapper>
        ))}
      </Scroll>
    </SectionWrapper>
  )
}

export default StarsSection
