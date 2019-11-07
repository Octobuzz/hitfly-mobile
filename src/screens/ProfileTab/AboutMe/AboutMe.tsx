import React from 'react'
import {
  H2,
  Loader,
  TextBase,
  ScrollView,
  RefreshControl,
} from 'src/components'
import Icon from 'react-native-vector-icons/Ionicons'
import MusicGroup from './MusicGroup'
import BonusProgram from './BonusProgram'
import { Profile } from 'src/apollo'
import { helpers } from 'src/utils'
import styled from 'src/styled-components'

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

const YearText = styled(TextBase)`
  font-size: 14px;
  line-height: 14px;
  margin-bottom: 10px;
  font-family: ${({ theme }) => theme.fonts.medium};
`

const DescriptionText = styled(TextBase)`
  font-size: 14px;
  line-height: 20px;
`

const NoInfoText = styled(TextBase)`
  color: ${({ theme }) => theme.colors.textAlt};
  text-align: center;
`

interface Props {
  profile: Profile
  isLoading: boolean
  isRefreshing: boolean
  onRefresh: () => void
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

    if (favouriteGenres && favouriteGenres.length) {
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
    if (!musicGroups || !musicGroups.length) {
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

  private renderDescription = (): React.ReactNode => {
    const {
      profile: { description, careerStartDate },
    } = this.props
    const content: React.ReactNode[] = []

    if (careerStartDate) {
      content.push(
        <YearText key="year">
          Год начала карьеры{' '}
          <DescriptionText>{careerStartDate}</DescriptionText>
        </YearText>,
      )
    }

    if (description) {
      content.push(
        <DescriptionText key="description">{description}</DescriptionText>,
      )
    }

    if (!content.length) {
      return null
    }
    return (
      <Block>
        <IndentedH2>Описание</IndentedH2>
        {content}
      </Block>
    )
  }

  renderBonuses = (): React.ReactNode => {
    const {
      profile: {
        bonusProgramLevel,
        bonusProgramPoints,
        daysInBonusProgram,
        favouritesTracksCount,
      },
    } = this.props
    return (
      <Block>
        <BonusProgram
          bonusProgramLevel={bonusProgramLevel}
          bonusProgramPoints={bonusProgramPoints}
          daysInBonusProgram={daysInBonusProgram}
          favouritesTracksCount={favouritesTracksCount}
        />
      </Block>
    )
  }

  render() {
    const { onRefresh, isRefreshing, isLoading } = this.props
    return isLoading ? (
      <Loader isAbsolute />
    ) : (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        addBottomSafePadding
      >
        {this.renderProfileInfo()}
        {this.renderProfileGroups()}
        {this.renderBonuses()}
        {this.renderDescription()}
      </ScrollView>
    )
  }
}

export default AboutMe
