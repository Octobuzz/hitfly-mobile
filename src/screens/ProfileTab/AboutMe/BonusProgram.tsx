import React from 'react'
import { helpers } from 'src/utils'
import { Profile } from 'src/apollo'
import { H2, Link, Button, TextBase } from 'src/components'
import styled from 'src/styled-components'
import { images } from 'src/constants'

const TitleText = styled(H2)`
  margin-bottom: 3px;
`

const SubtitleText = styled(TextBase)`
  color: ${({ theme }) => theme.colors.textAlt};
  font-size: 12px;
`

const SubtitleBoldText = styled(SubtitleText)`
  font-family: ${({ theme }) => theme.fonts.medium};
`

const Row = styled.View`
  flex-direction: row;
  margin-top: 11px;
  margin-bottom: 11px;
`

const Column = styled.View`
  padding: 16px 8px;
  align-items: center;
  flex: 1;
`

const ColumnImage = styled.Image``

const ColumnText = styled(TextBase)`
  font-size: 12px;
  margin-top: 14px;
  text-align: center;
`

const Divider = styled.View`
  width: 1px;
  background-color: ${({ theme }) => theme.colors.inputBorder};
`

const IndentedLink = styled(Link)`
  margin-top: 16px;
`

interface Props
  extends Pick<
    Profile,
    | 'bonusProgramLevel'
    | 'bonusProgramPoints'
    | 'daysInBonusProgram'
    | 'favouritesTracksCount'
  > {}

class BonusProgram extends React.PureComponent<Props> {
  private getNameForPoints = helpers.getNameForCount({
    nominative: 'бонус',
    genitive: 'бонуса',
    genitiveMultiple: 'бонусов',
  })
  private getNameForDays = helpers.getNameForCount({
    nominative: 'день',
    genitive: 'дня',
    genitiveMultiple: 'дней',
  })
  private getNameForSongs = helpers.getNameForCount({
    nominative: 'любимая песня',
    genitive: 'любимые песни',
    genitiveMultiple: 'любимых песен',
  })
  render() {
    const {
      bonusProgramLevel,
      bonusProgramPoints,
      daysInBonusProgram,
      favouritesTracksCount,
    } = this.props
    const nextLevel = helpers.getNextBonusProgramHumanReadable(
      bonusProgramLevel,
      true,
    )
    return (
      <>
        <TitleText>
          {helpers.getBonusProgramLevelHumanReadable(bonusProgramLevel)}
        </TitleText>
        {nextLevel && (
          <SubtitleText>
            до{' '}
            {helpers.getNextBonusProgramHumanReadable(bonusProgramLevel, true)}{' '}
            осталось: <SubtitleBoldText>100000 б</SubtitleBoldText>
          </SubtitleText>
        )}

        <Row>
          <Column>
            <ColumnImage source={images.RING} />
            <ColumnText>
              {`${bonusProgramPoints} ${this.getNameForPoints(
                bonusProgramPoints,
              )}`}
            </ColumnText>
          </Column>
          <Divider />
          <Column>
            <ColumnImage source={images.CALENDAR} />
            <ColumnText>
              {`${daysInBonusProgram} ${this.getNameForDays(
                daysInBonusProgram,
              )} в Digico`}
            </ColumnText>
          </Column>
          <Divider />
          <Column>
            <ColumnImage source={images.HEART_MUSIC} />
            <ColumnText>
              {`${favouritesTracksCount} ${this.getNameForSongs(
                favouritesTracksCount,
              )}`}
            </ColumnText>
          </Column>
        </Row>

        <Button type="outline" title="На что потратить бонусы?" />
        <IndentedLink title="Подробнее о бонусной программе" />
      </>
    )
  }
}

export default BonusProgram
