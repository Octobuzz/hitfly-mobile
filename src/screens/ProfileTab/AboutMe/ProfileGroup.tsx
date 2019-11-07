import React from 'react'
import { MusicGroup } from 'src/apollo'
import { H2 } from 'src/components'
import Block from './Block'
import Group from './MusicGroup'
import { helpers } from 'src/utils'
import styled from 'src/styled-components'

const IndentedH2 = styled(H2)`
  margin-bottom: 24px;
`

interface Props {
  musicGroups: MusicGroup[] | null
}

const getNameForFollowers = helpers.getNameForCount({
  nominative: 'поклонник',
  genitive: 'поклонника',
  genitiveMultiple: 'поклонников',
})

const ProfileGroup: React.FC<Props> = ({ musicGroups }) => {
  if (!musicGroups || !musicGroups.length) {
    return null
  }

  return (
    <Block>
      <IndentedH2>Мои группы</IndentedH2>
      {musicGroups.map(({ id, title, followersCount, cover }) => (
        <Group
          key={id}
          imageUrl={cover[0].imageUrl}
          title={title}
          subtitle={`${followersCount} ${getNameForFollowers(followersCount)}`}
        />
      ))}
    </Block>
  )
}

export default ProfileGroup
