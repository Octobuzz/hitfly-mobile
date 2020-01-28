import React from 'react'
import { Genre, City } from 'src/apollo'
import { TextBase } from 'src/components'
import Icon from 'react-native-vector-icons/Ionicons'
import Block from './Block'
import styled from 'src/styled-components'

const StyledIcon = styled(Icon).attrs(({ theme }) => ({
  color: theme.colors.inputBorder,
  size: 20,
}))`
  margin-right: 8px;
`

const Row = styled.View<Indentable>`
  flex-direction: row;
  align-items: center;
  ${({ withMargin }) => withMargin && 'margin-top: 24px;'}
`

const NoInfoText = styled(TextBase)`
  color: ${({ theme }) => theme.colors.textAlt};
  text-align: center;
`

const Text = styled(TextBase)`
  flex: 1;
`

interface Indentable {
  withMargin?: boolean
}

interface Props {
  genres: Genre[] | null
  location: City | null
}

const ProfileInfo: React.FC<Props> = ({ genres, location }) => {
  const content: React.ReactNode[] = []

  if (location) {
    content.push(
      <Row key="location">
        <StyledIcon name="md-pin" />
        <Text>{location.title}</Text>
      </Row>,
    )
  }

  if (genres && genres.length) {
    content.push(
      <Row withMargin={content.length > 0} key="genres">
        <StyledIcon name="ios-musical-notes" />
        <Text>{genres.map(({ title }) => title).join(', ')}</Text>
      </Row>,
    )
  }

  if (!content.length) {
    content.push(
      <NoInfoText key="noInfo">
        Заполните информацию о себе в разделе «Настройки»
      </NoInfoText>,
    )
  }

  return <Block hideBorder>{content}</Block>
}

export default ProfileInfo
