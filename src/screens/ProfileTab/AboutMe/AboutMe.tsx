import React from 'react'
import { ScrollView, TextBase, H2 } from 'src/components'
import Icon from 'react-native-vector-icons/Ionicons'
import MusicGroup from './MusicGroup'
import { Profile } from 'src/apollo'
import styled from 'src/styled-components'
import { helpers } from 'src/utils'

const Block = styled.View`
  padding-vertical: 24px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.inputBorder};
`

const StyledIcon = styled(Icon).attrs(({ theme }) => ({
  color: theme.colors.inputBorder,
  size: 20,
}))`
  margin-right: 8px;
`

const Row = styled.View<Indentable>`
  flex-direction: row;
  align-items: center;
  ${({ withMargin }) => withMargin && `margin-top: 24px;`}
`

const IndentedH2 = styled(H2)`
  margin-bottom: 24px;
`

const NoInfoText = styled(TextBase)`
  color: ${({ theme }) => theme.colors.textAlt};
  text-align: center;
`

interface Props {
  profile: Profile
}

interface Indentable {
  withMargin?: boolean
}

class AboutMe extends React.Component<Props> {
  private renderProfileInfo = (): React.ReactNode => {
    const {
      profile: { favouriteGenres, location },
    } = this.props
    const content: React.ReactNode[] = []

    if (favouriteGenres) {
      content.push(
        <Row key="genres">
          <StyledIcon name="ios-musical-notes" />
          <TextBase>
            {favouriteGenres.map(({ title }) => title).join(', ')}
          </TextBase>
        </Row>,
      )
    }

    if (location) {
      content.push(
        <Row withMargin={content.length > 0} key="location">
          <StyledIcon name="md-pin" />
          <TextBase>{location.title}</TextBase>
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

    return <Block>{content}</Block>
  }

  private renderProfileGroups = (): React.ReactNode => {
    const {
      profile: { musicGroups },
    } = this.props
    if (!musicGroups) {
      return null
    }

    return (
      <Block>
        <IndentedH2>Мои группы</IndentedH2>
        {musicGroups.map(({ id, title, followersCount, cover }) => (
          <MusicGroup
            key={id}
            imageUrl={cover[0].imageUrl}
            title={title}
            subtitle={`${followersCount} ${this.getNameForFollowers(
              followersCount,
            )}`}
          />
        ))}
      </Block>
    )
  }

  private getNameForFollowers = helpers.getNameForCount({
    nominative: 'поклонник',
    genitive: 'поклонника',
    genitiveMultiple: 'поклонников',
  })

  render() {
    return (
      <ScrollView>
        {this.renderProfileInfo()}
        {this.renderProfileGroups()}
      </ScrollView>
    )
  }
}

export default AboutMe
